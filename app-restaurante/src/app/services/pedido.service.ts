import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly baseUrl = 'http://localhost:3000/pedidos';
  // private readonly baseUrl = 'https://jubilant-waddle-94w7v99jpwrfv57-3000.app.github.dev/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {
    console.log('listaando')
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  detalhar(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

  inserir(pedido: Pedido): Observable<Pedido> {
    console.log(pedido)
    return this.http.post<Pedido>(this.baseUrl, pedido);
  }

  atualizar(pedidoAtualizado: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/${pedidoAtualizado.id}`, pedidoAtualizado);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
