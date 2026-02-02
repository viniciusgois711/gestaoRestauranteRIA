import { Routes } from '@angular/router';
import { Pedidos } from './components/pedidos/pedidos';
import { PedidosForm } from './components/pedidos/pedidos-form/pedidos-form';
import { App } from './app';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'pedidos', component: Pedidos, canActivate: [authGuard] },
    { path: 'pedidos-form', component: PedidosForm, canActivate: [authGuard] },
    { path: 'pedidos-form/:id', component: PedidosForm, canActivate: [authGuard] },
    { path: 'pedidos-form/visualizar/:id', component: PedidosForm, canActivate: [authGuard] }
];
