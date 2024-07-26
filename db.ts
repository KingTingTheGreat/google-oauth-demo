import { MongoClient, Db, Collection } from 'mongodb';
import { CollectionCache } from './types';
import { MONGO_URI, DB_NAME } from './constants';

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is undefined');
}
if (!DB_NAME) {
  throw new Error('DB_NAME environment variable is undefined');
}

let client: MongoClient | null = null;
let cachedDb: Db | null = null;
const cachedCollections: CollectionCache = {};

const connect = async (): Promise<Db> => {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
};

const getCollection = async (collectionName: string): Promise<Collection> => {
  if (!cachedDb) {
    cachedDb = await connect();
  }
  if (!cachedCollections[collectionName]) {
    cachedCollections[collectionName] = cachedDb.collection(collectionName);
  }
  return cachedCollections[collectionName];
};

export default getCollection;
