import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../models/pedido.model';

@Component({
  selector: 'app-pedidos-list',
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule],
  templateUrl: './pedidos-list.html',
  styleUrl: './pedidos-list.css'
})
export class PedidosList {
  @Input() pedidos: Pedido[] = [];

  @Output() visualizar = new EventEmitter<Pedido>();
  @Output() editar = new EventEmitter<Pedido>();
  @Output() deletar = new EventEmitter<Pedido>();

  onVisualizarPedido(pedido: Pedido) {
    this.visualizar.emit(pedido);
  }
  
  onAbrirEditarPedido(pedido: Pedido) {
    this.editar.emit(pedido);
  }

  onDeletarPedido(pedido: Pedido) {
    this.deletar.emit(pedido);
  }


}
