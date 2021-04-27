import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styles: [
  ]
})
export class MenuBarComponent implements OnInit {


  items: MenuItem[] = [];

  get usuario(){
    return this._authService.usuario;
  }
  
  constructor(private primengConfig: PrimeNGConfig,
              private _router: Router,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.items = [
          {
              label: 'Clientes',
              icon: 'pi pi-fw pi-user',
              routerLink: 'listado'
          }
      ];
  }


  logOut(){
    localStorage.removeItem('token')
    this._router.navigate(['login'])
  }

}