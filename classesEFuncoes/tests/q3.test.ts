import { ordenarDecrescente } from '../src/q3';

describe('Testes da função ordenarDecrescente', () => {

  test('deve ordenar o array de strings em ordem decrescente', () => {
    const arrayTeste = ['carro', 'boneco', 'ave', 'lapis'];
    const resultadoEsperado = ['lapis', 'carro', 'boneco', 'ave'];
    
    expect(ordenarDecrescente([...arrayTeste])).toEqual(resultadoEsperado);
  });

  test('array vazio deve retornar array vazio', () => {
    const arrayVazio: string[] = [];
    expect(ordenarDecrescente(arrayVazio)).toEqual([]);
  });

  test('array com um elemento deve retornar o mesmo array', () => {
    const arrayUmElemento = ['banana'];
    expect(ordenarDecrescente(arrayUmElemento)).toEqual(['banana']);
  });

});
