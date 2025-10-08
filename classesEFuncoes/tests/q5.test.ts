import { extrairPares } from '../src/q5';

describe('Testes da função extrairPares', () => {

  test('deve retornar apenas os números pares do array', () => {
    const arrayTeste = [8, 3, 9, 5, 6, 12];
    const resultadoEsperado = [8, 6, 12];

    expect(extrairPares(arrayTeste)).toEqual(resultadoEsperado);
  });

  test('array sem elementos pares deve retornar array vazio', () => {
    const arraySemPares = [1, 3, 5, 7];
    expect(extrairPares(arraySemPares)).toEqual([]);
  });

  test('array vazio deve retornar array vazio', () => {
    const arrayVazio: number[] = [];
    expect(extrairPares(arrayVazio)).toEqual([]);
  });

  test('array com apenas números pares deve retornar o próprio array', () => {
    const arrayTodosPares = [2, 4, 6];
    expect(extrairPares(arrayTodosPares)).toEqual([2, 4, 6]);
  });

});
