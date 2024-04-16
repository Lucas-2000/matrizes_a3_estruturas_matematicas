import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const transposta = Router()

transposta.post("/transposta", (req, res) => {
  const {rows, columns, matrixValues} = req.body;

  const matrix = geraMatriz(rows, columns, matrixValues)

  const matrizTransposta = [];
  for (let i = 0; i < matrix[0].length; i++) {
      matrizTransposta.push([]);
      for (let j = 0; j < matrix.length; j++) {
          matrizTransposta[i].push(matrix[j][i]);
      }
  }

  res.status(200).send({transposta: matrizTransposta})
})

export {transposta}