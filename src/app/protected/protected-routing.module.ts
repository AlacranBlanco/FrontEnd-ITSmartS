import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { MainComponent } from './pages/main/main.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';

const routes: Routes = [
  {path: '', component: MainComponent ,children: [
    {path: 'listado', component: ListaClienteComponent},
    {path: 'nuevo', component: NuevoClienteComponent},
    {path: 'editar/:id', component: EditarClienteComponent},
    {path: '**', redirectTo: 'listado'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
