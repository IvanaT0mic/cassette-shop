import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { ApiService } from '../api.service';
import { User } from 'src/app/Models/Backend/User';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ConstRouteService } from '../Const/const-route.service';

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refresh';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _token: string;
  private _refreshToken: string;

  get token(): string {
    return this._token;
  }
  get refreshToken(): string {
    return this._refreshToken;
  }

  get isAuthorizated(): boolean {
    return !!this._token;
  }

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  saveToken(token: string, refreshToken: string): void {
    this._token = token;
    this._refreshToken = refreshToken;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(REFRESH_KEY, refreshToken);
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.api.login(credentials).pipe(
      tap((res) => {
        this.saveToken(res.token, res.refreshToken);
      }),
      map(() => {
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }

  logout(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
    this._refreshToken = null;
    this._token = null;
    this.userService.removeUser();
    this.router.navigate([`/${ConstRouteService.login}`]);
  }

  sendRefreshToken(): Observable<void> {
    return this.api.sendRefreshToken(this._refreshToken).pipe(
      map((res) => {
        this.saveToken(res.token, res.refreshToken);
      })
    );
  }
}
