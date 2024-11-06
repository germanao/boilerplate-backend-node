// Roteamento estático

import express from "express";
import { pessoaRoutes } from "./routes/pessoa";

const router = express.Router();

// Aqui centralizamos todas as rotas
// Precisa adicionar novos recursos manualmente
router.use("/pessoas", pessoaRoutes);

export const routes = router;
