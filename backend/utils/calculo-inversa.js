import { geraMatrizIdentidade } from "./gera-matriz-identidade.js";

function calcularMatrizInversa(matriz) {
  const n = matriz.length;
  if (n !== matriz[0].length) {
    return new Error(
      "A matriz não é quadrada, a inversa não pode ser calculada."
    );
  }

  const identidade = geraMatrizIdentidade(n, n);
  const matrizAumentada = matriz.map((linha, i) => linha.concat(identidade[i]));

  for (let i = 0; i < n; i++) {
    let pivô = matrizAumentada[i][i];
    if (pivô === 0) {
      let linhaParaTrocar = i + 1;
      while (linhaParaTrocar < n && matrizAumentada[linhaParaTrocar][i] === 0) {
        linhaParaTrocar++;
      }
      if (linhaParaTrocar === n) {
        return new Error(
          "A matriz é singular, a inversa não pode ser calculada."
        );
      }
      let temp = matrizAumentada[i];
      matrizAumentada[i] = matrizAumentada[linhaParaTrocar];
      matrizAumentada[linhaParaTrocar] = temp;
      pivô = matrizAumentada[i][i];
    }

    for (let j = i; j < 2 * n; j++) {
      matrizAumentada[i][j] /= pivô;
    }

    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let fator = matrizAumentada[k][i];
        for (let j = 0; j < 2 * n; j++) {
          matrizAumentada[k][j] -= fator * matrizAumentada[i][j];
        }
      }
    }
  }

  const inversa = matrizAumentada.map((linha) => linha.slice(n));

  return inversa;
}

export { calcularMatrizInversa };
