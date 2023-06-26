import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://127.0.0.1:8080/api/v1/web/authenticate';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  hasRoles(requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return false;
    }
    const userRoles = this.storageService.getUser().roles;
    return userRoles.every((role: any) => requiredRoles.includes(role['name'].toLowerCase()));
  }

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

  isTokenExpired(): boolean {
    return this.storageService.isTokenExpired();
  }

  logout(): Observable<any> {
    this.storageService.clearSession();
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
