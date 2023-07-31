import { describe, it, expect } from 'vitest';
import data from '$lib/data';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});


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
