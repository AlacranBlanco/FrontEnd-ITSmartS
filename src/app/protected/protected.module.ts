import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { MainComponent } from './pages/main/main.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';


@NgModule({
  declarations: [
    ListaClienteComponent,
    MainComponent,
    NuevoClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class ProtectedModule { }
