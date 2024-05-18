import { Router } from "express";

const nula = Router();

nula.post("/nula", (req, res) => {
  const { rows1, cols1, matrix1 } = req.body;

  if (!rows1 || !cols1 || !matrix1 || !Array.isArray(matrix1)) {
    return res.status(400).send({ erro: "Dados de entrada inválidos" });
  }

  const matrizNula = Array.from(
    {
      length: cols1,
    },
    () => new Array(rows1).fill(0)
  );

  res.status(200).send({ nula: matrizNula });
});

export { nula };
