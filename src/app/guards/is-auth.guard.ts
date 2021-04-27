import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService,
              private _router: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this._authService.validarToken()
      .pipe(
        tap(resp => {
          if(resp)
              this._router.navigate(['cliente']);
        })
      ) ?  true: false;
  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  boolean  {
   
    return this._authService.validarToken()
    .pipe(
      tap(resp => {
        if(resp)
            this._router.navigate(['cliente']);
      })
    ) ?  true: false;

     
  }
}
