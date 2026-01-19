import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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
  // pedidos$: Observable<Pedido[]>;


  visible: boolean = false
  visualizando: boolean = false

  constructor(private pedidoService: PedidoService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.carregaPedidos();
  }

  carregaPedidos() {
    this.pedidoService.listar().subscribe({
      next: (res) => {
        this.pedidos = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos', err);
      }
    });
  }

  postPutPedido() {

    this.visualizando = false
    console.log('postput')

     if (this.novoPedido.id !== 0) {
      this.pedidoService.atualizar(this.novoPedido).subscribe({
        next: () => this.carregaPedidos(),
        error: (err) => console.error(err)
      });
    } else {
      // this.pedidoService.inserir(this.novoPedido);
      console.log('inserir')
      this.pedidoService.inserir(this.novoPedido).subscribe({
        next: () => this.carregaPedidos(),
        error: (err) => console.error(err)
      });
    }

    this.resetarFormulario()
    this.visible = false; 
    this.carregaPedidos()
  }

  abrirEditarPedido(pedido:Pedido){
    this.router.navigate(['/pedidos-form', pedido.id])
  }

  deletarPedido(pedido: Pedido) {
    this.pedidoService.remover(pedido.id).subscribe({
      next: () => this.carregaPedidos(),
      error: (err) => console.error(err)
    });
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
