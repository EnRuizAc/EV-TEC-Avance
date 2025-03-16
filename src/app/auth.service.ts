import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor() {}

  checkLoginStatus(): boolean {
    return localStorage.getItem('email') !== null;
  }

  get isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

  login(email: string, password: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.isLoggedInSubject.next(false);
  }
}
