import Dexie from 'dexie';

export const db = new Dexie('Yu-Gi-Oh');

db.version(1).stores({
  cardinfo: 'id', // Primary key and indexed props
});