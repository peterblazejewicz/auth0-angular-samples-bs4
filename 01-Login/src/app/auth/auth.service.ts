import { Injectable } from '@angular/core';

import { IAuth } from './IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuth {
  isAuthenticated: boolean;

  constructor() {}

  handleAuthentication(): void {
    throw new Error('Method not implemented.');
  }
  login(): void {
    throw new Error('Method not implemented.');
  }
  logout(): void {
    throw new Error('Method not implemented.');
  }
}
