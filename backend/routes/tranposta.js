import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const transposta = Router()

transposta.post("/transposta", (req, res) => {
  const { rows1, cols1, matrix1 } = req.body;

  if (!rows1 || !cols1 || !matrix1 || !Array.isArray(matrix1)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (rows1 <= 0 || cols1 <= 0) {
    return res.status(400).send({ erro: "A matriz deve ter pelo menos uma linha e uma coluna." });
  }

  const matrix = geraMatriz(rows1, cols1, matrix1)

  const matrizTransposta = [];
  for (let i = 0; i < matrix[0].length; i++) {
    matrizTransposta.push([]);
    for (let j = 0; j < matrix.length; j++) {
      matrizTransposta[i].push(matrix[j][i]);
    }
  }

  res.status(200).send({ transposta: matrizTransposta })
})

export { transposta }