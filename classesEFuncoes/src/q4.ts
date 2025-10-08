
// 4. Faça um programa que leia o array pegue apenas os dois primeiros elementos. Use o método SLICE da classe Array.
// 4.1 Escreva um teste com o array [2,4,6,2,8,9,5]


const pegarDoisPrimeiros = (numeros: number[]): number[] => numeros.slice(0, 2);

const numerosTeste = [2, 4, 6, 2, 8, 9, 5];

console.log("Array original:", numerosTeste);
console.log("Dois primeiros elementos:", pegarDoisPrimeiros(numerosTeste));