import { Routes } from '@angular/router';
import { Pedidos } from './components/pedidos/pedidos';
import { App } from './app';
import { Home } from './components/home/home';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'pedidos', component: Pedidos }
];
