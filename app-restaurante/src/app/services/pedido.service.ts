import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private pedidos: Pedido[] = [
      { id: 1, cliente: 'João', produto: 'Pizza', quantidade: 2, status: 'Entregue' },
      { id: 2, cliente: 'Maria', produto: 'Hambúrguer', quantidade: 1, status: 'Preparando' },
      { id: 3, cliente: 'Carlos', produto: 'Refrigerante', quantidade: 3, status: 'Entregue' },
    ];

  private idCounter = 4;

  constructor() {}

  listar(): Pedido[] {
    return this.pedidos;
  }

  detalhar(id: number): Pedido | undefined {
    return this.pedidos.find(p => p.id === id);
  }

  inserir(pedido: Pedido): void {
    pedido.id = this.idCounter++;
    this.pedidos.push(pedido);
  }

  atualizar(pedidoAtualizado: Pedido): void {
    const index = this.pedidos.findIndex(p => p.id === pedidoAtualizado.id);
    if (index !== -1) {
      this.pedidos[index] = pedidoAtualizado;
    }
  }

  remover(id: number): void {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
  }
}
