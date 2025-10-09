// 5. Faça um programa que leia o array e extrai os elementos pares.
// Use o método FILTER da classe Array, passando uma função arrow como parâmetro.
// 5.1 Teste com o array [8, 3, 9, 5, 6, 12]

export const extrairPares = (numeros: number[]): number[] =>
  numeros.filter((num) => num % 2 === 0);
