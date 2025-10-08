// 6. Faça um programa TypeScript:
// 6.1 Crie duas classes que possuam uma interface em comum. Evite criar classes com nomes sem significado (class A, class X). Crie classes com nomes que representem algo significativo.
// 6.2 As classes devem possuir atributos diferentes. 
// 6.3 A interface deve possuir pelo menos um método. 
// 6.4 A implementação desse método nas classes deve utilizar os atributos.
// 6.5 Escreve um teste que instancie as classes criadas, altera os atributos e teste o método comum na interface.


interface Calculavel {
  calcular(): number;
}

class Funcionario implements Calculavel {
  nome: string;
  salarioBase: number;
  bonus: number;

  constructor(nome: string, salarioBase: number, bonus: number) {
    this.nome = nome;
    this.salarioBase = salarioBase;
    this.bonus = bonus;
  }

  calcular(): number {
    return this.salarioBase + this.bonus;
  }
}

class Produto implements Calculavel {
  nome: string;
  precoUnitario: number;
  quantidade: number;

  constructor(nome: string, precoUnitario: number, quantidade: number) {
    this.nome = nome;
    this.precoUnitario = precoUnitario;
    this.quantidade = quantidade;
  }

  calcular(): number {
    return this.precoUnitario * this.quantidade;
  }
}

const funcionario1 = new Funcionario("Lucas", 2000, 500);
const produto1 = new Produto("Notebook", 3500, 3);

console.log("Salário total do funcionário:", funcionario1.calcular());
console.log("Valor total do produto em estoque:", produto1.calcular());

funcionario1.bonus = 800;
produto1.quantidade = 5;

console.log("Novo salário total do funcionário:", funcionario1.calcular());
console.log("Novo valor total do produto em estoque:", produto1.calcular());
