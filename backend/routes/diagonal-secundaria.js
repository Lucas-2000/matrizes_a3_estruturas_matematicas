import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";

const diagonalSecundaria = Router();

diagonalSecundaria.post("/diagonal-secundaria", (req, res) => {
  const { rows, cols, matrix1 } = req.body;

  if (!rows || !cols || !matrix1 || !Array.isArray(matrix1)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (rows <= 0 || cols <= 0) {
    return res
      .status(400)
      .send({ erro: "A matriz deve ter pelo menos uma linha e uma coluna." });
  }

  if (rows !== cols) {
    return res
      .status(400)
      .send({
        erro: "A matriz deve ser quadrada para calcular a sua transposta",
      });
  }

  const matrix = geraMatriz(rows, cols, matrix1);

  let diagonalSecundaria = [];

  for (let i = 0; i < matrix.length; i++) {
    diagonalSecundaria.push(matrix[i][matrix[i].length - 1 - i]);
  }

  let soma = diagonalSecundaria.reduce((acc, valor) => acc + valor, 0);

  res.status(200).send({ diagonalSecundaria: diagonalSecundaria, soma: soma });
});

export { diagonalSecundaria };
