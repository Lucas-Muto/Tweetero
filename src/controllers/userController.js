import { usersCollection } from "../config/database.js";

export async function signUp(req, res) {
  try {
    const { username, avatar } = req.body;
    
    // Verifica se o usuário já existe
    const userExists = await usersCollection.findOne({ username });
    
    // Se o usuário já existe, apenas atualiza o avatar
    if (userExists) {
      await usersCollection.updateOne(
        { username },
        { $set: { avatar } }
      );
    } else {
      // Se não existe, insere novo usuário
      await usersCollection.insertOne({
        username,
        avatar
      });
    }

    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}