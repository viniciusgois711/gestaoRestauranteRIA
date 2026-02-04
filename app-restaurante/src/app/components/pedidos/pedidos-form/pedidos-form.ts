import { Component, input, output, model, signal, inject, OnInit, computed, effect } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
// PrimeNG Modules
import { ButtonModule } from 'primeng/button';         // <p-button>
import { InputTextModule } from 'primeng/inputtext';   // <input pInputText>
import { InputNumberModule } from 'primeng/inputnumber'; // <p-inputNumber>
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos-form',
  imports: [DialogModule, ButtonModule, InputTextModule, InputNumberModule, ReactiveFormsModule],
  templateUrl: './pedidos-form.html',
  styleUrl: './pedidos-form.css'
})
export class PedidosForm implements OnInit {

  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  id = input<number | null>(null);
  visible = model<boolean>(false);
  visibleChange = output<boolean>();

  visualizando = signal<boolean>(false);
  form: FormGroup = this.fb.group({
    cliente: [''],
    produto: [''],
    quantidade: [1],
    status: ['Preparando']
  });

  constructor() {
    effect(() => {
      if (this.id()) {
        this.pedidoService.detalhar(this.id()!).subscribe(pedido => {
          if (pedido) {
            this.form.patchValue(pedido);
          }
        });
        this.activatedRoute.url.subscribe(segments => {
          this.visualizando.set(segments.some(segment => segment.path === 'visualizar'));
        });
      }
    });
  }
  
  ngOnInit(){
    this.visible.set(true);
  }

  postPutPedido() {
    const pedido: Pedido = { ...this.form.value, id: this.id() || 0 };
    if (pedido.id !== 0) {
      this.pedidoService.atualizar(pedido).subscribe({
        next: () => this.voltarListagem(),
        error: (err) => console.error(err)
      });
    } else {
      this.pedidoService.inserir(pedido).subscribe({
        next: () => this.voltarListagem(),
        error: (err) => console.error(err)
      });
    }
  }

  voltarListagem(){
    this.router.navigate(['/pedidos']);
    this.visible.set(false);
    this.visibleChange.emit(false);
  }

}
