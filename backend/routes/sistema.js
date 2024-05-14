import { Router } from "express";

const sistema = Router();

sistema.post("/sistema", (req, res) => {
  const { system } = req.body;

  const n = system.length;
  const matrix = [];

  for (let i = 0; i < n; i++) {
    const equation = system[i];
    const coefficients = [];
    for (let j = 0; j < n; j++) {
      const term = equation[j];
      let coefficient;
      if (!isNaN(parseFloat(term))) {
        coefficient = parseFloat(term);
      } else {
        if (term === "x" || term === "y" || term === "z") {
          coefficient = 1;
        } else if (term === "-x" || term === "-y" || term === "-z") {
          coefficient = -1;
        } else {
          coefficient = 0;
        }
      }
      coefficients.push(coefficient);
    }
    const constant = parseFloat(equation[n]);
    coefficients.push(constant);
    matrix.push(coefficients);
  }

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = j;
      }
    }
    [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
    for (let j = i + 1; j < n; j++) {
      const factor = matrix[j][i] / matrix[i][i];
      for (let k = i; k < n + 1; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
    }
  }

  const resposta = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    resposta[i] = matrix[i][n];
    for (let j = i + 1; j < n; j++) {
      resposta[i] -= matrix[i][j] * resposta[j];
    }
    resposta[i] /= matrix[i][i];
    resposta[i] = parseFloat(resposta[i].toFixed(2));
  }

  return res.status(200).json({ resposta });
});

export { sistema };
