import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";
import { calcularDeterminanteLaplace } from "../utils/calculo-determinante.js";

const determinante = Router();

determinante.post("/determinante", (req, res) => {
  const { rows, columns, matrixValues } = req.body;

  if (!rows || !columns || !matrixValues || !Array.isArray(matrixValues)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (rows <= 0 || columns <= 0) {
    return res
      .status(400)
      .send({ erro: "A matriz deve ter pelo menos uma linha e uma coluna." });
  }

  if (rows !== columns) {
    return res.status(400).send({
      erro: "A matriz deve ser quadrada para calcular o seu determinante",
    });
  }

  const matriz = geraMatriz(rows, columns, matrixValues);

  const det = calcularDeterminanteLaplace(matriz);

  res.status(200).send({ determinante: det });
});

export { determinante };
