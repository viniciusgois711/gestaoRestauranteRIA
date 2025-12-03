import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-pedidos',
  imports: [TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule, PedidosList, PedidosForm],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {

  pedidos: Pedido[] = [];  
  displayModal: boolean = false;

  novoPedido: Pedido = {
  id: 0,
  cliente: '',
  produto: '',
  quantidade: 1,
  status: 'Preparando'
  };


  visible: boolean = false
  visualizando: boolean = false

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

  postPutPedido() {

    this.visualizando = false

    if (this.novoPedido.id !== 0) {
      const index = this.pedidos.findIndex((p:Pedido) => p.id === this.novoPedido.id);
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

  abrirEditarPedido(pedido:Pedido){
    this.novoPedido = {...pedido}
    this.visible = true
    this.visualizando = false
  }

  deletarPedido(pedido:Pedido){
    console.log(this.visible)
    this.pedidos = this.pedidos.filter((p:Pedido) => p.id !== pedido.id)
  }

  visualizarPedido(pedido:Pedido){
    console.log('visualiza')
    this.novoPedido = {...pedido}
    this.visualizando = true
    this.visible = true
  }

  abrirModal(){
    this.novoPedido = {
      id: 0,
      cliente: '',
      produto: '',
      quantidade: 1,
      status: 'Preparando'
    };
    this.visible = true
    this.visualizando = false
  }

}
