import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL, {
  directConnection: true
});

async function connectDB() {
  try {
    await mongoClient.connect();
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.log("Erro ao conectar ao MongoDB:", err.message);
    console.log("String de conexão usada:", process.env.DATABASE_URL);
  }
}

connectDB();

// Obter o banco de dados - aqui você pode definir o nome do banco
const db = mongoClient.db("tweetero");

export const usersCollection = db.collection("users");
export const tweetsCollection = db.collection("tweets");