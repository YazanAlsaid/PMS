import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("token:", token);
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json'
        },
        withCredentials: true
      });
    }
    return next.handle(request);
  }
}
