import { Routes } from '@angular/router';
import { Pedidos } from './components/pedidos/pedidos';
import { PedidosForm } from './components/pedidos/pedidos-form/pedidos-form';
import { App } from './app';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: Home, canActivate: [AuthGuard] },
    { path: 'pedidos', component: Pedidos, canActivate: [AuthGuard] },
    { path: 'pedidos-form', component: PedidosForm, canActivate: [AuthGuard] },
    { path: 'pedidos-form/:id', component: PedidosForm, canActivate: [AuthGuard] },
    { path: 'pedidos-form/visualizar/:id', component: PedidosForm, canActivate: [AuthGuard] }
];
