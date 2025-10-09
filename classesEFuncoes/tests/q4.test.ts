import { pegarDoisPrimeiros } from '../src/q4';

describe('Testes da função pegarDoisPrimeiros', () => {

  test('deve retornar os dois primeiros elementos do array', () => {
    const arrayTeste = [2, 4, 6, 2, 8, 9, 5];
    const resultadoEsperado = [2, 4];

    expect(pegarDoisPrimeiros(arrayTeste)).toEqual(resultadoEsperado);
  });

  test('array vazio deve retornar array vazio', () => {
    const arrayVazio: number[] = [];
    expect(pegarDoisPrimeiros(arrayVazio)).toEqual([]);
  });

  test('array com apenas um elemento deve retornar esse elemento', () => {
    const arrayUmElemento = [42];
    expect(pegarDoisPrimeiros(arrayUmElemento)).toEqual([42]);
  });

  test('array com dois elementos deve retornar os dois elementos', () => {
    const arrayDoisElementos = [7, 9];
    expect(pegarDoisPrimeiros(arrayDoisElementos)).toEqual([7, 9]);
  });

});
