import { type Tspec } from "tspec";

/**
 * Pessoa do treinamento
 *
 */
export interface Pessoa {
  id: number;
  nome: string;
  altura: number;
  dataNascimento: Date;
}

export type PessoaApiSpec = Tspec.DefineApiSpec<{
  basePath: "/api";
  tags: ["Pessoa"];
  paths: {
    "/pessoas/": {
      get: {
        summary: "Lista de pessoas";
        query: {
          nome?: string;
        };
        responses: {
          200: { pessoas: Pessoa[] };
        };
      };
      post: {
        summary: "Cria uma Pessoa";
        requestBody: Pessoa;
        body: Pessoa;
        responses: {
          201: Pessoa;
        };
      };
    };
    "/pessoas/{id}": {
      get: {
        summary: "Obtem Pessoa pelo ID";
        path: { id: number };
        responses: {
          200: Pessoa;
        };
      };
      put: {
        summary: "Atualiza uma Pessoa";
        path: { id: number };
        requestBody: Pessoa;
        body: Pessoa;
        responses: {
          200: Pessoa;
        };
      };
      delete: {
        summary: "Remove uma Pessoa";
        path: { id: number };
        responses: {
          204: undefined;
        };
      };
    };
  };
}>;
