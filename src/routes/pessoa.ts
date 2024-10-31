import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Obtem todas as pessoas");
});

router.get("/:id", (req, res) => {
  res.send("Obtem pessoa pelo ID");
});

export const pessoaRoutes = router;
