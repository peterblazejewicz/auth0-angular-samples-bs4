export interface IAuth {
  readonly isAuthenticated: boolean;
  handleAuthentication(): void;
  login(): void;
  logout(): void;
}
