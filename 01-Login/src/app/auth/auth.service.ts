import { Injectable } from '@angular/core';
import { WebAuth } from 'auth0-js';

import { environment } from '../../environments/environment';
import { IAuth } from './IAuth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuth {
  auth0: WebAuth;
  get isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  constructor(private router: Router) {
    this.auth0 = new WebAuth({
      clientID: environment.clientID,
      domain: environment.domain,
      responseType: 'token id_token',
      audience: `https://${environment.domain}/userinfo`,
      redirectUri: environment.callbackURL,
      scope: 'openid'
    });
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  login(): void {
    this.auth0.authorize();
  }
  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  private setSession(authResult: any) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
