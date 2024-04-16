import { Router } from "express";

const nula = Router()

nula.post("/nula", (req, res) => {
  const {rows, columns} = req.body;

  const matrix = Array.from({
      length: columns, 
  }, () => new Array(rows).fill(0))


  res.send(matrix);
})

export {nula}