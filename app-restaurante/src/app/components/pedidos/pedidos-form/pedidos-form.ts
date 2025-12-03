import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos-form',
  imports: [DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule],
  templateUrl: './pedidos-form.html',
  styleUrl: './pedidos-form.css'
})
export class PedidosForm {

  @Input() pedidos: any[] = [];
  @Input() novoPedido: any = {
  id: 0,
  cliente: '',
  produto: '',
  quantidade: 1,
  status: 'Preparando'
};
  @Input() visible: boolean = false;    
  @Input() visualizando: boolean = false;   
  @Output() visibleChange = new EventEmitter<boolean>();

  postPutPedido() {

    this.visualizando = false

    if (this.novoPedido.id !== 0) {
      const index = this.pedidos.findIndex((p:any) => p.id === this.novoPedido.id);
      if (index !== -1) {
        this.pedidos[index] = { ...this.novoPedido };
      }
    } 
    else {
      const novoId = this.pedidos.length > 0 ? this.pedidos[this.pedidos.length - 1].id + 1 : 1;
      this.pedidos.push({ ...this.novoPedido, id: novoId });
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
