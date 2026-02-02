import { Component, signal, inject, effect } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';
import { PedidosList } from './pedidos-list/pedidos-list';
import { PedidosForm } from './pedidos-form/pedidos-form';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule, PedidosList, PedidosForm],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

  private pedidoService = inject(PedidoService);
  private router = inject(Router);

  pedidos = signal<Pedido[]>([]);
  visible = signal<boolean>(false);
  visualizando = signal<boolean>(false);

  novoPedido = signal<Pedido>({
    id: 0,
    cliente: '',
    produto: '',
    quantidade: 1,
    status: 'Preparando'
  });

  constructor() {
    this.carregaPedidos();
  }

  carregaPedidos() {
    this.pedidoService.listar().subscribe({
      next: (res) => {
        this.pedidos.set(res);
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos', err);
      }
    });
  }

  postPutPedido() {
    this.visualizando.set(false);
    const pedido = this.novoPedido();
    if (pedido.id !== 0) {
      this.pedidoService.atualizar(pedido).subscribe({
        next: () => this.carregaPedidos(),
        error: (err) => console.error(err)
      });
    } else {
      this.pedidoService.inserir(pedido).subscribe({
        next: () => this.carregaPedidos(),
        error: (err) => console.error(err)
      });
    }
    this.resetarFormulario();
    this.visible.set(false);
  }

  abrirEditarPedido(pedido: Pedido) {
    this.router.navigate(['/pedidos-form', pedido.id]);
  }

  deletarPedido(pedido: Pedido) {
    this.pedidoService.remover(pedido.id).subscribe({
      next: () => this.carregaPedidos(),
      error: (err) => console.error(err)
    });
  }

  visualizarPedido(pedido: Pedido) {
    this.router.navigate(['/pedidos-form/visualizar', pedido.id]);
  }

  abrirModal() {
    this.router.navigate(['/pedidos-form']);
    this.resetarFormulario();
    this.visible.set(true);
    this.visualizando.set(false);
  }

  resetarFormulario() {
    this.novoPedido.set({
      id: 0,
      cliente: '',
      produto: '',
      quantidade: 1,
      status: 'Preparando'
    });
  }

}
