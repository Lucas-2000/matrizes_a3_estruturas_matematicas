import { Router } from "express";

const nula = Router()

nula.post("/nula", (req, res) => {
  const {rows, columns} = req.body;

  const matrizNula = Array.from({
      length: columns, 
  }, () => new Array(rows).fill(0))


  res.status(200).send({nula: matrizNula})
})

export {nula}