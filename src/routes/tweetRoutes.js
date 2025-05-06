import express from "express";
import { Router } from "express";

const router = Router();

// Rota GET para listar tweets
router.get("/tweets", (req, res) => {
  res.send("Rota de listagem de tweets - a implementar");
});

// Rota POST para criar tweets
router.post("/tweets", (req, res) => {
  res.send("Rota de criação de tweets - a implementar");
});

// Rota PUT para editar tweets
router.put("/tweets/:id", (req, res) => {
  res.send("Rota de edição de tweets - a implementar");
});

// Rota DELETE para excluir tweets
router.delete("/tweets/:id", (req, res) => {
  res.send("Rota de exclusão de tweets - a implementar");
});

export default router;