import { Injectable } from '@angular/core';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clearSession(): void {
    window.sessionStorage.clear();
  }

  saveUser(user: any): void {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  saveToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    const expiry = JSON.parse(atob(token.split('.')[1])).exp * 1000;
    return Date.now() > expiry;
  }
}
