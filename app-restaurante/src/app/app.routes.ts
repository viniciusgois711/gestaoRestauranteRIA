import { Routes } from '@angular/router';
import { Pedidos } from './components/pedidos/pedidos';
import { PedidosForm } from './components/pedidos/pedidos-form/pedidos-form';
import { App } from './app';
import { Home } from './components/home/home';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'pedidos', component: Pedidos },
    { path: 'pedidos-form', component: PedidosForm },
    { path: 'pedidos-form/:id', component: PedidosForm },
    { path: 'pedidos-form/visualizar/:id', component: PedidosForm }
];
