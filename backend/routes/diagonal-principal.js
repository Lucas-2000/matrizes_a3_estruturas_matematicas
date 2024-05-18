import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const diagonalPrincipal = Router()

diagonalPrincipal.post("/somaDiagonalPrincipal", (req, res) => {
  const { rows1, cols1, matrix1 } = req.body;

  if (!rows1 || !cols1 || !matrix1 || !Array.isArray(matrix1)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (rows1 <= 0 || cols1 <= 0) {
    return res.status(400).send({ erro: "A matriz deve ter pelo menos uma linha e uma coluna." });
  }

  if (rows1 !== cols1) {
    return res.status(400).send({ erro: "A matriz deve ser quadrada para calcular a sua transposta" });
  }

  const matrix = geraMatriz(rows1, cols1, matrix1)

  let diagonalPrincipal = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j) {
        diagonalPrincipal.push(matrix[i][j]);
      }
    }
  }

  let somaDiagonalPrincipal = diagonalPrincipal.reduce((acc, valor) => acc + valor, 0);

  res.status(200).send({ diagonalPrincipal: diagonalPrincipal, somaDiagonalPrincipal: somaDiagonalPrincipal });
})

export { diagonalPrincipal }