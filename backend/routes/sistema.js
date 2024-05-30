import { Router } from "express";

const sistema = Router();

sistema.post("/responseSistema", (req, res) => {
  const { sistema } = req.body;

  if (!sistema || !Array.isArray(sistema) || sistema.length === 0) {
    return res.status(400).json({ error: "Sistema de equações não fornecido ou em formato inválido." });
  }

  const n = sistema.length;

  const expectedTermCount = n + 1;
  for (let i = 0; i < n; i++) {
    if (!Array.isArray(sistema[i]) || sistema[i].length !== expectedTermCount) {
      return res.status(400).json({ error: "Cada equação deve ter o mesmo número de termos (incógnitas + constante)." });
    }
  }

  const matrix = [];

  for (let i = 0; i < n; i++) {
    const equation = sistema[i];
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
    if (matrix[i][i] === 0) {
      return res.status(400).json({ error: "Divisão por zero detectada. O sistema não pode ser resolvido." });
    }
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

  const responseSistema = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    responseSistema[i] = matrix[i][n];
    for (let j = i + 1; j < n; j++) {
      responseSistema[i] -= matrix[i][j] * responseSistema[j];
    }
    responseSistema[i] /= matrix[i][i];
    responseSistema[i] = parseFloat(responseSistema[i].toFixed(3));
  }
  return res.status(200).json({ responseSistema });
});

export { sistema };
