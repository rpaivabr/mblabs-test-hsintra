import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { CadastroEventoComponent } from './components/cadastro-evento/cadastro-evento.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos', component: ListarEventosComponent },
  { path: 'eventos/cadastro', component: CadastroEventoComponent },
  { path: 'usuarios/cadastro', component: CadastroUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
