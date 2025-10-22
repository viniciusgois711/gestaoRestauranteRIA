import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Pedidos } from './components/pedidos/pedidos';
@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private router: Router){
  }

  abrirPedidos(){
    this.router.navigate(['/pedidos']);
  }
}
