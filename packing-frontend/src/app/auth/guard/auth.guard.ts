import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { StorageService } from '../Services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('AuthGuard', this.authService.isLoggedIn());

    const allowedRoles = route.data['roles'] as string[];

    console.log('route.data.title: ', route.data['title']);

    if (this.authService.isLoggedIn() && allowedRoles && allowedRoles.length > 0) {
      console.log(this.authService.hasRoles(allowedRoles));

      if (this.authService.hasRoles(allowedRoles)) {
        return true;
      } else {
        return this.router.createUrlTree(['/dashboard/forbidden']);
      }
    } else {
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
