import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  return client;
}

export const insertDocuments = async (client, collection, document) => {
  const db = client.db();
  const result = db.collection(collection).insertOne(document);
  return result;
}

export const getAllDocuments = async (client, collection, sort, filter) => {
  const db  = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray()

  return documents;
}