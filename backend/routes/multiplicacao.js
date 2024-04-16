import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const multiplicacao = Router();

multiplicacao.post("/multiplicacao", (req, res) => {
  const { rowsMatrizA, columnsMatrizA, valuesMatrizA, rowsMatrizB, columnsMatrizB, valuesMatrizB } = req.body;

  if (!rowsMatrizA || !columnsMatrizA || !valuesMatrizA || !rowsMatrizB || !columnsMatrizB || !valuesMatrizB) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (columnsMatrizA !== rowsMatrizB) {
    return res.status(400).send({ erro: "O número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz para a multiplicação ser possível" });
  }

  const matrizA = geraMatriz(rowsMatrizA, columnsMatrizA, valuesMatrizA);
  const matrizB = geraMatriz(rowsMatrizB, columnsMatrizB, valuesMatrizB);

  let resultado = [];
  let passoAPasso = [];

  for (let i = 0; i < rowsMatrizA; i++) {
    resultado.push([]);
    let passoLinha = [];
    for (let j = 0; j < columnsMatrizB; j++) {
      let acc = 0;
      let passoColuna = [];
      for (let k = 0; k < columnsMatrizA; k++) {
        const produto = matrizA[i][k] * matrizB[k][j];
        acc += produto;
        passoColuna.push(`(${matrizA[i][k]} * ${matrizB[k][j]})`);
      }
      resultado[i].push(acc);
      passoLinha.push(passoColuna.join(" + ") + ` = ${acc}`);
    }
    passoAPasso.push(passoLinha);
  }

  res.status(200).send({ multiplicacao: resultado, passoAPasso: passoAPasso });
});

export { multiplicacao };
