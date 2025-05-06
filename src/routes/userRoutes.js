import express from "express";
import { Router } from "express";
import { signUp } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";

const router = Router();

// Rota de cadastro de usuário
router.post("/sign-up", validateSchema(userSchema), signUp);

export default router;