import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos-list',
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule],
  templateUrl: './pedidos-list.html',
  styleUrl: './pedidos-list.css'
})
export class PedidosList {
  @Input() pedidos: any[] = [];

  @Output() visualizar = new EventEmitter<any>();
  @Output() editar = new EventEmitter<any>();
  @Output() deletar = new EventEmitter<any>();

  onVisualizarPedido(pedido: any) {
    this.visualizar.emit(pedido);
  }
  
  onAbrirEditarPedido(pedido: any) {
    this.editar.emit(pedido);
  }

  onDeletarPedido(pedido: any) {
    this.deletar.emit(pedido);
  }


}
