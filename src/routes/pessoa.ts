/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from "express";
import { getRandomID } from "../utils/utils";
import { type Pessoa } from "../utils/apiSpec";

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
    const pessoaDoBodyDaRequisicao: Pessoa = req.body;
    if (!pessoaDoBodyDaRequisicao) res.status(404).send("Pessoa inválida");

    let pessoaExistente = pessoasMock.find(
      (pessoa: Pessoa) => pessoa.id === +req.params.id,
    );

    if (!pessoaExistente)
      res.status(404).send("Nenhuma pessoa encontrada para o ID informado");

    // Atualiza as informações da requisição
    pessoaExistente = {
      id: +req.params.id,
      nome: pessoaDoBodyDaRequisicao.nome,
      altura: pessoaDoBodyDaRequisicao.altura,
      dataNascimento: pessoaDoBodyDaRequisicao.dataNascimento,
    };

    pessoasMock = pessoasMock.filter(
      (pessoa: Pessoa) => pessoa.id !== +req.params.id,
    );
    pessoasMock.push(pessoaExistente);

    res.json(pessoaExistente);
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
