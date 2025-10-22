import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {

  pedidos: any = []  
  displayModal: boolean = false; // controla visibilidade do modal

  novoPedido = {
    id: 0,
    cliente: '',
    produto: '',
    quantidade: 1,
    status: 'Preparando'
  };

  username = ''
  visible = false


  ngOnInit() {
    this.carregaPedidos()
  }

  carregaPedidos(){
     this.pedidos = [
      { id: 1, cliente: 'João', produto: 'Pizza', quantidade: 2, status: 'Entregue' },
      { id: 2, cliente: 'Maria', produto: 'Hambúrguer', quantidade: 1, status: 'Preparando' },
      { id: 3, cliente: 'Carlos', produto: 'Refrigerante', quantidade: 3, status: 'Entregue' },
    ]
  }

  adicionarPedido(){
    console.log('adicionou')

    console.log(this.username)
    console.log(this.pedidos.length)
    console.log(this.pedidos.lenght +1)
    this.pedidos.push({...this.novoPedido, id: this.pedidos.length +1 })
    console.log(this.novoPedido)
  }

  editarPedido(pedido:any){
    console.log('editou', pedido)
  }

  deletarPedido(pedido:any){
    console.log('deletou', pedido)
  }

}
