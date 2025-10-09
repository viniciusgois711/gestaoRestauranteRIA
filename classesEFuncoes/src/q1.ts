// 1. Faça um programa TypeScript que calcule o quadrado de cada elemento do array, use as seguintes estratégias:
// a. iterando com for simples
// b. iterando com forEach
// 1.1 Escreve um teste com o array [3,5,7,3,8,9,1]


export function quadradoComFor(numeros: any): number[] {
    const resultado: number[] = [];

    for (let i = 0; i < numeros.length; i++) {

        resultado.push(numeros[i] ** 2);
    }
    return resultado;
}

export function quadradoComForEach(numeros: number[]): number[] {
  const resultado: number[] = [];
  numeros.forEach((num) => resultado.push(num ** 2));
  return resultado;
}
