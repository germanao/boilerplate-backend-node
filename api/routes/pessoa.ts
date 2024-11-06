/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from "express";
import { getRandomID } from "../utils/utils";
import { type Pessoa } from "../utils/apiSpec";
import { atualizar } from "./pessoaService";

const router = express.Router();
let { pessoas: pessoasMock } = require("../utils/pessoas.json");

router.get("/", (req, res) => {
  const nameFilter = req.query.nome;

  res.json({
    pessoas: nameFilter
      ? pessoasMock.filter((pessoa: Pessoa) => pessoa.nome === nameFilter)
      : pessoasMock,
  });
});

router.get("/:id", (req, res) => {
  const pessoaExistente = pessoasMock.find(
    (pessoa: Pessoa) => pessoa.id === +req.params.id,
  );

  if (!pessoaExistente)
    res.status(404).send("Nenhuma pessoa encontrada para o ID informado");

  res.json(pessoaExistente);
});

router.post("/", (req, res) => {
  try {
    const pessoaDoBodyDaRequisicao: Pessoa = req.body;
    if (!pessoaDoBodyDaRequisicao) res.status(404).send("Pessoa inválida");

    const novaPessoaParaSalvar = {
      ...pessoaDoBodyDaRequisicao,
      id: getRandomID(),
    };

    pessoasMock.push(novaPessoaParaSalvar);

    res.status(201).json(novaPessoaParaSalvar);
  } catch (error) {
    console.error(error);
    res.send("Erro interno").status(500);
  }
});

router.put("/:id", (req, res) => {
  try {
    try {
      const pessoaAtualizada = atualizar(req.body, +req.params.id);
      res.json(pessoaAtualizada);
    } catch (error: any) {
      const errorType: Error = error;
      res.status(404).send(errorType.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

router.delete("/:id", (req, res) => {
  try {
    const pessoaExistente = pessoasMock.find(
      (pessoa: Pessoa) => pessoa.id === +req.params.id,
    );

    if (!pessoaExistente)
      res.status(404).send("Nenhuma pessoa encontrada para o ID informado");

    pessoasMock = pessoasMock.filter(
      (pessoa: Pessoa) => pessoa.id !== +req.params.id,
    );

    res.status(204).send("Pessoa removida com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

export const pessoaRoutes = router;
