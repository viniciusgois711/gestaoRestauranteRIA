// 3. Faça um programa que imprima seus elementos ordenados. Use o método SORT
// da classe Array para ordenar de forma decrescente, passando uma função arrow como parâmetro.
// 3.1 Escreva um teste com o array [‘carro’, ’boneco’, ’ave’, ‘lapis’]



const ordenarDecrescente = (palavras: string[]): string[] =>
  palavras.sort((a, b) => b.localeCompare(a)); 


const palavrasTeste = ['carro', 'boneco', 'ave', 'lapis'];

console.log("Array original:", palavrasTeste);
console.log("Array ordenado (decrescente):", ordenarDecrescente([...palavrasTeste]));
