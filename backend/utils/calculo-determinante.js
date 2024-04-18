export function calcularDeterminanteLaplace(matriz) {
  let det = 0;

  if (matriz.length === 1) {
    return matriz[0][0];
  }

  if (matriz.length === 2) {
    return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
  }

  for (let j = 0; j < matriz.length; j++) {
    const cofator =
      matriz[0][j] *
      cofatorSinal(0, j) *
      calcularDeterminanteLaplace(matrizMenor(matriz, 0, j));
    console.log("Cofator para posição (0," + j + "):", cofator);
    det += cofator;
  }

  return det;
}

function cofatorSinal(i, j) {
  const sinal = (i + j) % 2 === 0 ? 1 : -1;
  console.log("Sinal para posição (" + i + "," + j + "):", sinal);
  return sinal;
}

function matrizMenor(matriz, i, j) {
  const matrizMenorResultante = matriz
    .filter((_, rowIndex) => rowIndex !== i)
    .map((row) => row.filter((_, colIndex) => colIndex !== j));

  console.log(
    "Matriz menor para posição (" + i + "," + j + "):",
    matrizMenorResultante
  );

  return matrizMenorResultante;
}
