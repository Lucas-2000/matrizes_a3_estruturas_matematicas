import { Router } from "express";

const nula = Router()

nula.post("/nula", (req, res) => {
  const {rows, columns} = req.body;

  if (!rows || !columns) {
    return res.status(400).send({erro: "Dados de entrada inválidos"});
  }

  const matrizNula = Array.from({
      length: columns, 
  }, () => new Array(rows).fill(0))


  res.status(200).send({nula: matrizNula})
})

export {nula}