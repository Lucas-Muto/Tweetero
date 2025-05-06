import { tweetsCollection, usersCollection } from "../config/database.js";
import { ObjectId } from "mongodb";

export async function createTweet(req, res) {
  try {
    const { username, tweet } = req.body;
    
    // Verifica se o usuário existe
    const userExists = await usersCollection.findOne({ username });
    if (!userExists) {
      return res.status(401).send("Usuário não autorizado");
    }
    
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
    
    // Adiciona avatar para cada tweet
    const tweetsWithAvatar = [];
    for (const tweet of tweets) {
      const user = await usersCollection.findOne({ username: tweet.username });
      tweetsWithAvatar.push({
        ...tweet,
        avatar: user.avatar
      });
    }
    
    return res.status(200).send(tweetsWithAvatar);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}

export async function updateTweet(req, res) {
  try {
    const { id } = req.params;
    const { tweet } = req.body;
    
    // Verifica se o tweet existe
    const tweetExists = await tweetsCollection.findOne({ _id: new ObjectId(id) });
    if (!tweetExists) {
      return res.status(404).send("Tweet não encontrado");
    }
    
    // Verifica se o usuário é o dono do tweet
    if (tweetExists.username !== req.body.username) {
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
    
    await tweetsCollection.deleteOne({ _id: new ObjectId(id) });
    
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}