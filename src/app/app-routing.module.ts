import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { IsAuthGuard } from './guards/is-auth.guard';

const routes: Routes = [
  {path: 'auth', canActivate: [ IsAuthGuard ], canLoad: [IsAuthGuard],  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'cliente', canActivate: [ ValidarTokenGuard ], canLoad: [ ValidarTokenGuard ], loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule)},
  {path: '**', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
