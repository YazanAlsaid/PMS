import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json'
        },
        withCredentials: true
      });
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          // Token is still valid
          console.log("Token is valid");
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token is not valid, redirect to login page
          sessionStorage.removeItem('token');
          sessionStorage.setItem('redirectUrl', this.router.url); // Store the current URL
          this.router.navigate(['/auth']);
        }
        return throwError(error);
      })
    );
  }
}
