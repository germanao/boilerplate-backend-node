/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from "express";
import { type Pessoa } from "../utils/apiSpec";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  const nameFilter = req.query.nome as string;

  const pessoas = await prisma.user.findMany({
    where: {
      name: nameFilter ?? undefined,
    },
  });

  res.json({
    pessoas,
  });
});

router.get("/:id", async (req, res) => {
  const pessoaExistente = await prisma.user.findUnique({
    where: {
      id: +req.params.id,
      // idade: {
      //   gte: 1,
      // },
      // NOT: {
      //   name: { in: ["teste2", "teste1"] },
      // },
    },
  });

  if (!pessoaExistente) {
    res.status(404).send("Nenhuma pessoa encontrada para o ID informado");
    return;
  }

  res.json(pessoaExistente);
});

router.post("/", async (req, res) => {
  try {
    const pessoaDoBodyDaRequisicao: Pessoa = req.body;
    if (!pessoaDoBodyDaRequisicao) {
      res.status(404).send("Pessoa inválida");
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        name: pessoaDoBodyDaRequisicao.nome,
        email: pessoaDoBodyDaRequisicao.email,
        idade: pessoaDoBodyDaRequisicao.idade,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.send("Erro interno").status(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pessoaDoBodyDaRequisicao: Pessoa = req.body;
    if (!pessoaDoBodyDaRequisicao) {
      res.status(404).send("Pessoa inválida");
      return;
    }

    const pessoaExistente = await prisma.user.findUnique({
      where: { id: +req.params.id },
    });

    if (!pessoaExistente) {
      res.status(404).send("Nenhuma pessoa encontrada para o ID informado");
      return;
    }

    const pessoaAtualizada = await prisma.user.update({
      data: {
        name: pessoaDoBodyDaRequisicao.nome,
        email: pessoaDoBodyDaRequisicao.email,
        idade: pessoaDoBodyDaRequisicao.idade,
      },
      where: { id: +req.params.id },
    });

    res.json(pessoaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pessoaExistente = await prisma.user.findUnique({
      where: { id: +req.params.id },
    });

    if (!pessoaExistente) {
      res.status(404).send("Nenhuma pessoa encontrada para o ID informado");
      return;
    }

    await prisma.user.delete({ where: { id: pessoaExistente.id } });

    res.status(204).send("Pessoa removida com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno");
  }
});

export const pessoaRoutes = router;
