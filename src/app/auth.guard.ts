import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './core/services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Si ya esta autenticado lo redirecciona al admin
    return this.authService.hasUser().pipe(
      map(user => user === null ? true : false),
      tap(hasUser => {
        // Si esta autenticado
        if (!hasUser) {
          this.router.navigate(['/admin']);
        }
      }),
    );
  }

}
