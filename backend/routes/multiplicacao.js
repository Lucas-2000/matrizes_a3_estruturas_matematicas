import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const multiplicacao = Router();

multiplicacao.post("/multiplicacao", (req, res) => {
  const {
    rows1,
    cols1,
    matrix1,
    rows2,
    cols2,
    matrix2,
  } = req.body;

  if (
    !rows1 ||
    !cols1 ||
    !matrix1 ||
    !rows2 ||
    !cols2 ||
    !matrix2
  ) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (cols1 !== rows2) {
    return res.status(400).send({
      erro: "O número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz para a multiplicação ser possível",
    });
  }

  const matrizA = geraMatriz(rows1, cols1, matrix1);
  const matrizB = geraMatriz(rows2, cols2, matrix2);

  let resultado = [];
  let passoAPasso = [];

  for (let i = 0; i < rows1; i++) {
    resultado.push([]);
    passoAPasso.push([]);
    for (let j = 0; j < cols2; j++) {
      let acc = 0;
      let passoColuna = [];
      for (let k = 0; k < cols1; k++) {
        const produto = matrizA[i][k] * matrizB[k][j];
        acc += produto;
        passoColuna.push(`(${matrizA[i][k]} * ${matrizB[k][j]})`);
      }
      resultado[i].push(acc);
      passoAPasso[i].push(passoColuna.join(" + ") + ` = ${acc}`);
    }
  }

  res.status(200).send({ multiplicacao: resultado, passoAPasso: passoAPasso });
});

export { multiplicacao };
