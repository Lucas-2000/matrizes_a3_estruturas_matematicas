import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const diagonalSecundaria = Router()

diagonalSecundaria.post("/diagonal-secundaria", (req, res) => {
  const {rows, columns, matrixValues} = req.body;

  const matrix = geraMatriz(rows, columns, matrixValues)

  let diagonalSecundaria = [];

  for (let i = 0; i < matrix.length; i++) {
    diagonalSecundaria.push(matrix[i][matrix[i].length - 1 - i]);
  }

  let soma = diagonalSecundaria.reduce((acc, valor) => acc + valor, 0);

  res.status(200).send({diagonalSecundaria: diagonalSecundaria, soma : soma});
})

export {diagonalSecundaria}