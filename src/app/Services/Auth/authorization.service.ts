import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { ApiService } from '../api.service';
import { User } from 'src/app/Models/Backend/User';
import { ConstService } from '../Const/const.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refresh';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _token: string;
  private _refreshToken: string;
  private _user: User;

  get user(): User {
    return JSON.parse(JSON.stringify(this._user));
  }

  get token(): string {
    return this._token;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }

  get isAuthorizated(): boolean {
    return !!this._token;
  }

  constructor(private api: ApiService, private router: Router) {}

  saveToken(token: string, refreshToken: string): void {
    this._token = token;
    this._refreshToken = refreshToken;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(REFRESH_KEY, refreshToken);
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.api.login(credentials).pipe(
      tap((res) => {
        console.log(this._user);

        this.saveToken(res.token, res.refreshToken);
      }),
      map(() => {
        console.log(this._user);
        return true;
      }),
      catchError(async (res) => {
        return false;
      })
    );
  }

  logout(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
    this._refreshToken = null;
    this._token = null;
    this._user = null;
    this.router.navigate([`/${ConstService.login}`]);
  }

  sendRefreshToken(): Observable<void> {
    return this.api.sendRefreshToken(this._refreshToken).pipe(
      map((res) => {
        this.saveToken(res.token, res.refreshToken);
      })
    );
  }
}
