import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Auth, AuthResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(private _httpClient: HttpClient) { }

  get usuario(){
    return {...this._usuario};
  }

  login(auth: Auth) {
    const url = `${this._baseUrl}/auth`;
    return this._httpClient.post<AuthResponse>(url, auth)
        .pipe(
          tap( resp => { 
            localStorage.setItem('token', resp.token!);
            if(resp.uid){
              this._usuario = {
                name: resp.name!,
                uid: resp.uid
              }
            }
          }),
          map(resp => resp),
          catchError(err => of(err.error.msg))
        );
  }

  validarToken(): Observable<boolean>{
    const url = `${this._baseUrl}/auth/renew`;

    const headers = new HttpHeaders()
                       .set('token', localStorage.getItem('token') || '');

    return this._httpClient.get<AuthResponse>(url, {headers})
              .pipe(
                map( resp => {
                  localStorage.setItem('token', resp.token!);
                  this._usuario = {
                    name: resp.name!,
                    uid: resp.uid
                  }
                  return resp.ok!;
                }),
                catchError(err => of(false))
              )
  }
}
