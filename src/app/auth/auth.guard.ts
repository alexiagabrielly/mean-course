import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      //a função getIsAuth() vai guardar a informação se o usuário tem autenticação independente de onde ele esteja
      const isAuth = this.authService.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
      return isAuth;
  }
}
