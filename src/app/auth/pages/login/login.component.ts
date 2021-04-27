import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {


  auth!: Auth;

  miForm: FormGroup = this._formBuilder.group({
    name: ['Jhon Doe', [Validators.required, Validators.minLength(3)]],
    password: ['123123', [Validators.required, Validators.minLength(6)]]
  })
  constructor(private _formBuilder: FormBuilder,
              private primengConfig: PrimeNGConfig,
              private _router: Router,
              private _authService: AuthService) { 
                this._router.navigate(['cliente'])
              }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
   
  }

  login(){
    this.auth = this.miForm.value;
    this._authService.login(this.auth)
        .subscribe(res => {
            if(res.uid){
              this._router.navigate(['cliente'])
            } else {
              Swal.fire(
                'Error',
                `${res}`,
                'error'
              )
            }
        })
  }

}
