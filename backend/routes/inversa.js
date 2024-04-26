import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";
import { calcularMatrizInversa } from "../utils/calculo-inversa.js";

const inversa = Router();

inversa.post("/inversa", (req, res) => {
  const { rows, columns, matrixValues } = req.body;

  if (!rows || !columns || !matrixValues || !Array.isArray(matrixValues)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (rows <= 0 || columns <= 0) {
    return res
      .status(400)
      .send({ erro: "A matriz deve ter pelo menos uma linha e uma coluna." });
  }

  const matrix = geraMatriz(rows, columns, matrixValues);

  const matrizInversa = calcularMatrizInversa(matrix);

  if (matrizInversa instanceof Error) {
    return res.status(400).send({ erro: matrizInversa.message });
  }

  res.status(200).send({ inversa: matrizInversa });
});

export { inversa };
