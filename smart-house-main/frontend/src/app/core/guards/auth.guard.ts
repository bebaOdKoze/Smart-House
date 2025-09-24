import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth';
import { catchError, map, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookie: CookieService, 
              private authService: AuthService,
              private router: Router){}
 canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree {
  
  const token = this.authService.getToken();

  if (token) {
    console.log('Token iz storage:', token);
    return true;
  } else {
    console.log('Token ne postoji');
    return this.router.createUrlTree(['/login']);
  }
}

  
}