import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

async function connectDB() {
  try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
  } catch (err) {
    console.log(err);
  }
}

connectDB();

const db = mongoClient.db();

export const usersCollection = db.collection("users");
export const tweetsCollection = db.collection("tweets");