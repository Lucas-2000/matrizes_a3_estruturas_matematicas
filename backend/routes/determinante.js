import { Router } from "express";
import { geraMatriz } from "../utils/gera-matriz.js";
import { calcularDeterminanteLaplace } from "../utils/calculo-determinante.js";

const determinante = Router();

determinante.post("/determinante", (req, res) => {
  const { rows1, cols1, matrix1 } = req.body;

  if (!rows1 || !cols1 || !matrix1 || !Array.isArray(matrix1)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  if (rows1 <= 0 || cols1 <= 0) {
    return res
      .status(400)
      .send({ erro: "A matriz deve ter pelo menos uma linha e uma coluna." });
  }

  if (rows1 !== cols1) {
    return res.status(400).send({
      erro: "A matriz deve ser quadrada para calcular o seu determinante",
    });
  }

  const matriz = geraMatriz(rows1, cols1, matrix1);

  const det = calcularDeterminanteLaplace(matriz);

  res.status(200).send({ determinante: det });
});

export { determinante };
