import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';


@Component({
  selector: 'app-pedidos-form',
  imports: [DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule],
  templateUrl: './pedidos-form.html',
  styleUrl: './pedidos-form.css'
})
export class PedidosForm {

  @Input() pedidos: Pedido[] = [];
  @Input() novoPedido: Pedido = {
    id: 0,
    cliente: '',
    produto: '',
    quantidade: 1,
    status: 'Preparando'
  };
  @Input() visible: boolean = false;    
  @Input() visualizando: boolean = false;   
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private pedidoService: PedidoService) {}
  
  postPutPedido() {

    this.visualizando = false

     if (this.novoPedido.id !== 0) {
      this.pedidoService.atualizar(this.novoPedido);
    } else {
      this.pedidoService.inserir(this.novoPedido);
    }

    this.novoPedido = {
      id: 0,
      cliente: '',
      produto: '',
      quantidade: 1,
      status: 'Preparando'
    };
    this.visible = false; 
  }

}
