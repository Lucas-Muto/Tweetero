import express from "express";
import { Router } from "express";
import { createTweet, getTweets, updateTweet, deleteTweet } from "../controllers/tweetController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateUser } from "../middlewares/authMiddleware.js";
import { tweetSchema } from "../schemas/tweetSchema.js";

const router = Router();

// Rota GET para listar tweets
router.get("/tweets", getTweets);

// Rota POST para criar tweets
router.post("/tweets", validateSchema(tweetSchema), validateUser, createTweet);

// Rota PUT para editar tweets
router.put("/tweets/:id", validateSchema(tweetSchema), validateUser, updateTweet);

// Rota DELETE para excluir tweets
router.delete("/tweets/:id", validateUser, deleteTweet);

export default router;