export function geraMatriz(rows, columns, matrixValues) {
  const matrix = Array.from({ length: rows }, () => new Array(columns).fill(0));

  let k = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = matrixValues[k];
      k++;
    }
  }
  return matrix;
}
