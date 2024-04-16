import { Router } from "express"
import { geraMatriz } from "../utils/gera-matriz.js"

const subtracao = Router()

subtracao.post("/subtracao", (req, res) => {
  const {rowsMatrizA, columnsMatrizA, valuesMatrizA, rowsMatrizB, columnsMatrizB, valuesMatrizB} = req.body

  if (!rowsMatrizA || !columnsMatrizA || !valuesMatrizA || !rowsMatrizB || !columnsMatrizB || !valuesMatrizB) {
    return res.status(400).send({erro: "Dados de entrada inválidos"});
  }

  if (rowsMatrizA !== rowsMatrizB || columnsMatrizA !== columnsMatrizB) {
    return res.status(400).send({erro: "As matrizes devem ter o mesmo número de linhas e colunas para a subtração poder ser realizada"});
  }

  const matrizA = geraMatriz(rowsMatrizA, columnsMatrizA, valuesMatrizA)
  const matrizB = geraMatriz(rowsMatrizB, columnsMatrizB, valuesMatrizB)

  let resultado = [];
  let passoAPasso = [];

  for (let i = 0; i < matrizA.length; i++) {
      let linhaResultado = [];
      let passoLinha = [];
      for (let j = 0; j < matrizA[i].length; j++) {
          let subtracao = matrizA[i][j] - matrizB[i][j];
          linhaResultado.push(subtracao);
          passoLinha.push(`${matrizA[i][j]} - ${matrizB[i][j]} = ${subtracao}`);
      }
      resultado.push(linhaResultado);
      passoAPasso.push(passoLinha);
  }
  
  res.status(200).send({ subtracao: resultado, passoAPasso: passoAPasso });
})

export {subtracao}