import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos-form',
  imports: [DialogModule, ButtonModule, InputTextModule, InputNumberModule, FormsModule],
  templateUrl: './pedidos-form.html',
  styleUrl: './pedidos-form.css'
})
export class PedidosForm implements OnInit {

  novoPedido: Pedido = {
    id: 0,
    cliente: '',
    produto: '',
    quantidade: 1,
    status: 'Preparando'
  };
  visible: boolean = false;    
  visualizando: boolean = false;   
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private pedidoService: PedidoService, private activatedRoute: ActivatedRoute, private router: Router) {}
  
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id){
        this.novoPedido = this.pedidoService.detalhar(+id) || this.novoPedido
        this.activatedRoute.url.subscribe(segments => {
          this.visualizando = segments.some(segment => segment.path === 'visualizar');
        });
      }
    })
    this.visible = true
  }

  postPutPedido() {
    
    if (this.novoPedido.id !== 0) {
      this.pedidoService.atualizar(this.novoPedido);
    } else {
      this.pedidoService.inserir(this.novoPedido);
    }

    this.voltarListagem()
  }

  voltarListagem(){
    this.router.navigate(['/pedidos']);
    this.visible = false;
  }

}
