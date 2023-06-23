import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8080/api/v1/web/authenticate';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        email,
        password,
      },
      httpOptions
    );
  }
  // Check if the token is expired
  isTokenExpired(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return true;
    }

    const expiry = JSON.parse(atob(token.split('.')[1])).exp * 1000;
    return Date.now() > expiry; // Return the boolean value here
  }



  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
