import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const diagonalPrincipal = Router()

diagonalPrincipal.post("/diagonal-principal", (req, res) => {
  const {rows, columns, matrixValues} = req.body;

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