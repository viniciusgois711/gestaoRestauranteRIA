// Importa as funções que vamos testar
import { quadradoComFor, quadradoComForEach } from '../src/q1';

describe('Testes das funções de quadrado', () => {

  const arrayTeste = [3, 5, 7, 3, 8, 9, 1];
  const resultadoEsperado = [9, 25, 49, 9, 64, 81, 1];

  test('quadradoComFor deve retornar o quadrado de cada elemento', () => {
    expect(quadradoComFor(arrayTeste)).toEqual(resultadoEsperado);
  });

  test('quadradoComForEach deve retornar o quadrado de cada elemento', () => {
    expect(quadradoComForEach(arrayTeste)).toEqual(resultadoEsperado);
  });

});
