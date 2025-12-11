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
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pedidos',
  imports: [AsyncPipe, TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule, PedidosList, PedidosForm],
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
  pedidos$: Observable<Pedido[]>;


  visible: boolean = false
  visualizando: boolean = false

  constructor(private pedidoService: PedidoService, private router: Router) {
    this.pedidos$ = this.pedidoService.listar();
    console.log('aqui')
    this.pedidos$ = this.pedidoService.listar().pipe(
      tap(data => console.log('Dados recebidos:', data))
    );
  }

  ngOnInit() {
    this.carregaPedidos();
  }

  carregaPedidos() {
    this.pedidos$ = this.pedidoService.listar();
  }

  postPutPedido() {

    this.visualizando = false

     if (this.novoPedido.id !== 0) {
      this.pedidoService.atualizar(this.novoPedido);
    } else {
      this.pedidoService.inserir(this.novoPedido);
    }

    this.resetarFormulario()
    this.visible = false; 
  }

  abrirEditarPedido(pedido:Pedido){
    this.router.navigate(['/pedidos-form', pedido.id])
  }

  deletarPedido(pedido: Pedido) {
    this.pedidoService.remover(pedido.id);
    this.carregaPedidos();
  }
 

  visualizarPedido(pedido:Pedido){
    this.router.navigate(['/pedidos-form/visualizar', pedido.id])
  }

  abrirModal() {
    this.router.navigate(['/pedidos-form'])
    this.resetarFormulario()
    this.visible = true
    this.visualizando = false
  }

  resetarFormulario() {
    this.novoPedido = {
      id: 0,
      cliente: '',
      produto: '',
      quantidade: 1,
      status: 'Preparando'
    };
  }

}
