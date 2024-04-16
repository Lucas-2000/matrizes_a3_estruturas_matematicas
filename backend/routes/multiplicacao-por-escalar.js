import { Router } from "express"
import { geraMatriz } from "../utils/gera-matriz.js"

const multiplicacaoPorEscalar = Router()

multiplicacaoPorEscalar.post("/multiplicacao-por-escalar", (req, res) => {
  const {rowsMatrizA, columnsMatrizA, valuesMatrizA, escalar} = req.body

  if (!rowsMatrizA || !columnsMatrizA || !valuesMatrizA || escalar === undefined || isNaN(escalar)) {
    return res.status(400).send({erro: "Dados de entrada inválidos"});
  }


  const matrizA = geraMatriz(rowsMatrizA, columnsMatrizA, valuesMatrizA)

  let resultado = [];
  let passoAPasso = [];

  for (let i = 0; i < matrizA.length; i++) {
      let linhaResultado = [];
      let passoLinha = [];
      for (let j = 0; j < matrizA[i].length; j++) {
          let multiplicacaoPorEscalar = matrizA[i][j] * escalar;
          linhaResultado.push(multiplicacaoPorEscalar);
          passoLinha.push(`${matrizA[i][j]} * ${escalar} = ${multiplicacaoPorEscalar}`);
      }
      resultado.push(linhaResultado);
      passoAPasso.push(passoLinha);
  }
  
  res.status(200).send({ multiplicacaoPorEscalar: resultado, passoAPasso: passoAPasso });
})

export {multiplicacaoPorEscalar}