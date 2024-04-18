export function geraMatrizIdentidade(rows, columns) {
  if (rows !== columns) {
    throw new Error("Uma matriz identidade deve ser quadrada");
  }

  const matrix = Array.from(
    {
      length: columns,
    },
    () => new Array(rows).fill(0)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      }
    }
  }

  return matrix;
}
