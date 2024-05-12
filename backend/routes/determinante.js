import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";
import { calcularDeterminanteLaplace } from "../utils/calculo-determinante.js";

const determinante = Router();

determinante.post("/determinante", (req, res) => {
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
    return res.status(400).send({
      erro: "A matriz deve ser quadrada para calcular o seu determinante",
    });
  }

  const matriz = geraMatriz(rows, cols, matrix1);

  const det = calcularDeterminanteLaplace(matriz);

  res.status(200).send({ determinante: det });
});

export { determinante };
