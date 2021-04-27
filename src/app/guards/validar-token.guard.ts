import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService,
              private _router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this._authService.validarToken()
            .pipe(
              tap(resp => {
                if(!resp)
                    this._router.navigate(['/auth']);
              })
            );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this._authService.validarToken()
              .pipe(
                tap(resp => {
                  if(!resp)
                      this._router.navigate(['/auth']);
                    
                })
            );
  }
}
