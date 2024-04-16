export function geraMatriz(rows, columns, matrixValues) {
    
  const matrix = Array.from({
      length: columns, 
  }, () => new Array(rows).fill(0))

  let k = 0;
  for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
          matrix[i][j] = matrixValues[k];
          k++;
      }
  }

  return matrix
}