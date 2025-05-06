import express from "express";
import { Router } from "express";

const router = Router();

// Rota de cadastro de usuário
router.post("/sign-up", (req, res) => {
  res.send("Rota de cadastro de usuário - a implementar");
});

export default router;