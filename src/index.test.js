import { describe, it, expect } from 'vitest';
import data from '$lib/data';
import { db } from '$lib/db'; 
import api from '$lib/api'; 

// @ts-ignore
api.list.mockResolvedValue([{ id: 1, name: 'Card 1', type:'XYZ Monster' }, { id: 2, name: 'Card 2', type:'XYZ Monster2' }]); // Mock la función list de 'api'

// Mock el módulo 'db' para evitar llamadas reales a la base de datos en las pruebas
// @ts-ignore
jest.mock('./db', () => {
	return {
	  db: {
		cardinfo: {
		  // @ts-ignore
		  toArray: jest.fn().mockResolvedValue([{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }]), // Mock la función toArray
		  // @ts-ignore
		  bulkAdd: jest.fn(), // Mock la función bulkAdd
		  // @ts-ignore
		  get: jest.fn().mockResolvedValue(null), // Mock la función get
		},
	  },
	};
  });

//test pagination
describe('test skip and take', () => {
	it('skip 0 take 15 length equal to 15', async () => {
		var result = await data.list(0, 15);
		expect(result.items.length).toBe(15);
	});

	it('skip 15 take 50 length equal to 50', async () => {
		var result = await data.list(0, 50); 
		expect(result.items.length).toBe(50);
	});
});

//data
describe('data', () => {
	// @ts-ignore
	afterEach(() => {
	  // Limpia los mocks después de cada prueba
	  // @ts-ignore
	  jest.clearAllMocks();
	});
  
	it('should fetch data from the API if the data in db is empty', async () => {
	  // Act
	  const result = await data.list();
  
	  // Assert
	  expect(api.list).toHaveBeenCalled();
	  // @ts-ignore
	  expect(db.cardinfo.bulkAdd).toHaveBeenCalledWith([{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }]);
	  expect(result.items).toEqual([{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }]);
	  expect(result.total).toBe(2);
	});
  
	it('should fetch data from db if data is available', async () => {
	  // Arrange
	  // @ts-ignore
	  db.cardinfo.toArray.mockResolvedValueOnce([{ id: 3, name: 'Card 3' }, { id: 4, name: 'Card 4' }]);
  
	  // Act
	  const result = await api.list();
  
	  // Assert
	  expect(api.list).not.toHaveBeenCalled();
	  expect(result.items).toEqual([{ id: 3, name: 'Card 3' }, { id: 4, name: 'Card 4' }]);
	  expect(result.total).toBe(2);
	});
  
	it('should filter data based on the provided filter', async () => {
	  // Arrange
	  // @ts-ignore
	  db.cardinfo.toArray.mockResolvedValueOnce([
		{ id: 1, name: 'Card 1', type: 'Type 1', frameType: 'Frame 1' },
		{ id: 2, name: 'Card 2', type: 'Type 2', frameType: 'Frame 2' },
	  ]);
	  const filter = 'Type 1';
  
	  // Act
	  // @ts-ignore
	  const result = await app.list(0, 15, filter);
  
	  // Assert
	  expect(result.items).toEqual([{ id: 1, name: 'Card 1', type: 'Type 1', frameType: 'Frame 1' }]);
	  expect(result.total).toBe(1);
	});
  
	it('should return an empty array if there is no data', async () => {
	  // Arrange
	  // @ts-ignore
	  db.cardinfo.toArray.mockResolvedValueOnce([]);
  
	  // Act
	  // @ts-ignore
	  const result = await app.list();
  
	  // Assert
	  expect(result.items).toEqual([]);
	  expect(result.total).toBe(0);
	});
  });
