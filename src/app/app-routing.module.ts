import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { CadastroEventoComponent } from './components/cadastro-evento/cadastro-evento.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { ListarIngressosComponent } from './components/listar-ingressos/listar-ingressos.component';
import { AdminGuard } from './services/admin.guard';
import { LoggedInGuard } from './services/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'eventos', component: ListarEventosComponent },
  { path: 'home', component: ListarEventosComponent },
  { path: 'eventos/cadastro', component: CadastroEventoComponent, canActivate: [AdminGuard] },
  { path: 'usuarios/cadastro', component: CadastroUsuarioComponent },
  { path: 'ingressos', component: ListarIngressosComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
