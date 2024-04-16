import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const transposta = Router()

transposta.post("/transposta", (req, res) => {
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