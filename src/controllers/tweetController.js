import { tweetsCollection } from "../config/database.js";
import { ObjectId } from "mongodb";

export async function createTweet(req, res) {
  try {
    const { username, tweet } = req.body;
    
    await tweetsCollection.insertOne({
      username,
      tweet
    });
    
    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function getTweets(req, res) {
  try {
    const tweets = await tweetsCollection
      .find()
      .sort({ _id: -1 }) // Ordena do mais recente para o mais antigo
      .toArray();
    
    // Usar o mongoDB aggregation para juntar com a coleção de usuários e obter o avatar
    const tweetsWithAvatars = await tweetsCollection.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "username",
          as: "user"
        }
      },
      {
        $addFields: {
          avatar: { $arrayElemAt: ["$user.avatar", 0] }
        }
      },
      {
        $project: {
          user: 0
        }
      },
      {
        $sort: { _id: -1 }
      }
    ]).toArray();
    
    return res.status(200).send(tweetsWithAvatars);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function updateTweet(req, res) {
  try {
    const { id } = req.params;
    const { tweet, username } = req.body;
    
    // Verifica se o tweet existe
    const tweetExists = await tweetsCollection.findOne({ _id: new ObjectId(id) });
    if (!tweetExists) {
      return res.status(404).send("Tweet não encontrado");
    }
    
    // Verifica se o usuário é o dono do tweet
    if (tweetExists.username !== username) {
      return res.status(401).send("Você não tem permissão para editar este tweet");
    }
    
    await tweetsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { tweet } }
    );
    
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function deleteTweet(req, res) {
  try {
    const { id } = req.params;
    
    // Verifica se o tweet existe
    const tweetExists = await tweetsCollection.findOne({ _id: new ObjectId(id) });
    if (!tweetExists) {
      return res.status(404).send("Tweet não encontrado");
    }
    
    // Deletamos o tweet sem verificar o username para simplificar
    await tweetsCollection.deleteOne({ _id: new ObjectId(id) });
    
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}