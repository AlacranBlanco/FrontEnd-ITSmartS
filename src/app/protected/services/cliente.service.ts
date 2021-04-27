import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private _baseUrl: string = environment.baseUrl;

  constructor(private _httClient: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    const url = `${this._baseUrl}/cliente`;
    return this._httClient.get<Cliente[]>(url)
  }


  getClienteById(id: string): Observable<Cliente>{
    const url = `${this._baseUrl}/cliente/${id}`;
    return this._httClient.get<Cliente>(url)
            .pipe(
              map(resp => resp),
              catchError(err => of(err.error.msg))
            );

  }

  eliminarClienteById(id: string): Observable<any>{
    const url = `${this._baseUrl}/cliente/eliminar/${id}`;
    return this._httClient.delete<any>(url)
            .pipe(
              map(resp => resp),
              catchError(err => of(err.error.msg))
            );

  }

  nuevoCliente(cliente: Cliente): Observable<Cliente>{
    const url = `${this._baseUrl}/cliente/nuevo`;
    return this._httClient.post<Cliente>(url, cliente)
                .pipe(
                  map(resp => resp),
                  catchError(err => of(err.error.msg))
                )
  }

  editarCliente(cliente: Cliente): Observable<Cliente>{
    const url = `${this._baseUrl}/cliente/editar/${cliente._id}`;
    return this._httClient.put<Cliente>(url, cliente)
                .pipe(
                  map(resp => resp),
                  catchError(err => of(err.error.msg))
                )
  }


}
