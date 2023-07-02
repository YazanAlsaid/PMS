import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly AUTH_API: string = '';
  readonly RESET_API: string = '';
  readonly SET_API: string = '';
  private readonly hostname: string = window.location.hostname;
  private readonly port: string = window.location.port;
  private readonly protocol: string = window.location.protocol;
  private readonly url: string = '';

  constructor(private http: HttpClient, private storageService: StorageService) {
    if (this.hostname === '127.0.0.1' || this.hostname === 'localhost') {
      this.url = `${this.protocol}//${this.hostname}:8080`;
    } else if (this.port === '80' || this.port === '443') {
      this.url = `${this.protocol}//${this.hostname}`;
    } else {
      this.url = `${this.protocol}//${this.hostname}:${this.port}`;
    }

    this.AUTH_API = `${this.url}/api/v1/web/authenticate`;
    this.RESET_API = `${this.url}/api/v1/web/reset/reset-password`;
    this.SET_API = `${this.url}/api/v1/web/reset/change-password`;
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  hasRoles(requiredRoles: string[]): boolean {
    if (!requiredRoles || requiredRoles.length === 0) {
      return false;
    }
    const userRoles = this.storageService.getUser().roles;
    return userRoles.every((role: any) =>
      requiredRoles.includes(role['name'].toLowerCase())
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTH_API,
      {
        email,
        password,
      },
      httpOptions
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.RESET_API, email , httpOptions);
  }

  setNewPassword(token: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(this.SET_API, { token, password, confirmPassword }, httpOptions);
  }

  isTokenExpired(): boolean {
    return this.storageService.isTokenExpired();
  }

  logout(): Observable<any> {
    this.storageService.clearSession();
    return this.http.post<any>(`${this.AUTH_API}/signout`, {}, httpOptions);
  }
}
