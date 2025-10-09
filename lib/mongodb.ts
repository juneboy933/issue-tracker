import { MongoClient, ServerApiVersion } from 'mongodb';

if(!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
};

const client = new MongoClient(process.env.MONGODB_URI, {
     serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db('issue-tracker');
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
}

export async function getCollection(collectionName: string) {
    const db = await connectToDatabase();
    return db?.collection(collectionName);
}