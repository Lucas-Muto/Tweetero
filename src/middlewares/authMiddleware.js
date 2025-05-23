import { usersCollection } from "../config/database.js";

export async function validateUser(req, res, next) {
  // Obtém o username do corpo, query ou headers da requisição
  const username = req.body?.username || req.query?.username || req.headers?.username;

  if (!username) {
    return res.status(422).send("O nome de usuário é obrigatório");
  }

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).send("Usuário não autorizado");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor");
  }
}
