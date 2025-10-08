import { Funcionario, Produto } from '../src/q6';

describe('Testes das classes Funcionario e Produto', () => {

  test('calcular() deve retornar o salário total do funcionário', () => {
    const funcionario = new Funcionario("Lucas", 2000, 500);
    expect(funcionario.calcular()).toBe(2500);

    funcionario.bonus = 800;
    expect(funcionario.calcular()).toBe(2800);
  });

  test('calcular() deve retornar o valor total do produto em estoque', () => {
    const produto = new Produto("Notebook", 3500, 3);
    expect(produto.calcular()).toBe(10500);

    produto.quantidade = 5;
    expect(produto.calcular()).toBe(17500);
  });

  test('instâncias são do tipo correto', () => {
    const funcionario = new Funcionario("Ana", 1500, 200);
    const produto = new Produto("Mouse", 100, 10);

    expect(funcionario).toBeInstanceOf(Funcionario);
    expect(produto).toBeInstanceOf(Produto);
  });

});
