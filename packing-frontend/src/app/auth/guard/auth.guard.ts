import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const allowedRoles = route.data['roles'] as string[];

    if (this.authService.isLoggedIn() && state.url === '/auth/login') {
      this.router.navigate(['/user/dashboard']).then(() => {
      });
      return true;
    } else if (!this.authService.isLoggedIn() && state.url === '/auth/login' || state.url.includes('/reset-password') || state.url.includes('/change-password')) {
      return true;
    } else if (!this.authService.isLoggedIn() && !state.url.includes('returnUrl')) {
      this.router.createUrlTree(['/auth/login'], {queryParams: {returnUrl: state.url}});
      return true;
    } else if (this.authService.isLoggedIn() && allowedRoles && allowedRoles.length > 0) {
      if (!this.authService.hasRoles(allowedRoles)) {
        this.router.createUrlTree(['/dashboard/forbidden']);
      }
      return true;
    } else {
      this.router.createUrlTree(['/auth/login'], {queryParams: {returnUrl: state.url}});
      return true;
    }

    return false;
  }
}
