import { MongoClient } from "mongodb";

export async function connectDB(): Promise<MongoClient> {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
