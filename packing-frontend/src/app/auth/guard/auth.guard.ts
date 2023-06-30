import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { StorageService } from '../Services/storage.service';
import { isThisQuarter } from 'date-fns';
import { tr } from 'date-fns/locale';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedRoles = route.data['roles'] as string[];


    if (this.authService.isLoggedIn() && state.url === '/auth/login') {
      this.router.navigate(['/user/dashboard']);
      return true;
    } else if (!this.authService.isLoggedIn() && state.url === '/auth/login' || state.url.includes('/reset-password') || state.url.includes('/change-password')) {
      return true;
    } else if (!this.authService.isLoggedIn() && !state.url.includes('returnUrl')) {
      console.log(state.url);
      console.log(this.authService.isLoggedIn());
      this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return true;
    } else if (this.authService.isLoggedIn() && allowedRoles && allowedRoles.length > 0) {
      console.log(this.authService.hasRoles(allowedRoles));
      if (!this.authService.hasRoles(allowedRoles)) {
        this.router.createUrlTree(['/dashboard/forbidden']);
      }
      return true;
    } else {
      this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return true;
    }

    return false;
  }
}
