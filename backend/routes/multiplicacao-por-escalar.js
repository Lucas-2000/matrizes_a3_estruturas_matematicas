import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const multiplicacaoPorEscalar = Router();

multiplicacaoPorEscalar.post("/multiplicacaoPorEscalar", (req, res) => {
  const { rows1, cols1, matrix1, escalar } = req.body;

  if (
    !rows1 ||
    !cols1 ||
    !matrix1 ||
    escalar === undefined ||
    isNaN(escalar)
  ) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  const matrizA = geraMatriz(rows1, cols1, matrix1);

  let resultado = [];
  let passoAPasso = [];

  for (let i = 0; i < matrizA.length; i++) {
    let linhaResultado = [];
    let passoLinha = [];
    for (let j = 0; j < matrizA[i].length; j++) {
      let multiplicacaoPorEscalar = matrizA[i][j] * escalar;
      linhaResultado.push(multiplicacaoPorEscalar);
      passoLinha.push(
        `${matrizA[i][j]} * ${escalar} = ${multiplicacaoPorEscalar}`
      );
    }
    resultado.push(linhaResultado);
    passoAPasso.push(passoLinha);
  }

  res
    .status(200)
    .send({ multiplicacaoPorEscalar: resultado, passoAPasso: passoAPasso });
});

export { multiplicacaoPorEscalar };
