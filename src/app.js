import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import tweetRoutes from "./routes/tweetRoutes.js";

// Configuração
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rota básica para teste
app.get("/", (req, res) => {
  res.send("API Tweteroo está funcionando!");
});

// Rotas
app.use(userRoutes);
app.use(tweetRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});