/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Pessoa } from "../utils/apiSpec";
let { pessoas: pessoasMock } = require("../utils/pessoas.json");

export const atualizar = (pessoa: Pessoa, id: number): Pessoa => {
  if (!pessoa) throw Error("Pessoa Inválida");

  let pessoaExistente = pessoasMock.find((pessoa: Pessoa) => pessoa.id === id);

  if (!pessoaExistente)
    throw Error("Nenhuma pessoa encontrada para o ID informado");

  // Atualiza as informações da requisição
  pessoaExistente = {
    id,
    nome: pessoa.nome,
    altura: pessoa.altura,
    dataNascimento: pessoa.dataNascimento,
  };

  pessoasMock = pessoasMock.filter((pessoa: Pessoa) => pessoa.id !== id);

  return pessoaExistente;
};
