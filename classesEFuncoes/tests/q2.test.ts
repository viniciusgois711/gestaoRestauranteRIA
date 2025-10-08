import { concatenarComEspaco } from '../src/q2';

describe('Testes da função concatenarComEspaco', () => {
  
  test('deve concatenar as palavras com um espaço', () => {
    const arrayTeste = ['Arrays', 'com', 'TypeScript'];
    const resultadoEsperado = 'Arrays com TypeScript';
    
    expect(concatenarComEspaco(arrayTeste)).toBe(resultadoEsperado);
  });

  test('array vazio deve retornar string vazia', () => {
    const arrayVazio: string[] = [];
    expect(concatenarComEspaco(arrayVazio)).toBe('');
  });

  test('array com uma palavra deve retornar a própria palavra', () => {
    const arrayUmElemento = ['TypeScript'];
    expect(concatenarComEspaco(arrayUmElemento)).toBe('TypeScript');
  });

});
