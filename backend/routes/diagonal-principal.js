import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const diagonalPrincipal = Router()

diagonalPrincipal.post("/diagonal-principal", (req, res) => {
  const {rows, columns, matrixValues} = req.body;

  if (!rows || !columns || !matrixValues || !Array.isArray(matrixValues)) {
    return res.status(400).send({erro: "Dados de entrada inválidos"});
  }

  if (rows <= 0 || columns <= 0) {
    return res.status(400).send({erro: "A matriz deve ter pelo menos uma linha e uma coluna."});
  }

  if (rows !== columns) {
    return res.status(400).send({erro: "A matriz deve ser quadrada para calcular a sua transposta"});
  }

  const matrix = geraMatriz(rows, columns, matrixValues)

  let diagonalPrincipal = []

  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
          if (i === j) {
              diagonalPrincipal.push(matrix[i][j]);
          }
      }
  }

  let soma = diagonalPrincipal.reduce((acc, valor) => acc + valor, 0);

  res.status(200).send({diagonalPrincipal: diagonalPrincipal, soma : soma});
})

export {diagonalPrincipal}