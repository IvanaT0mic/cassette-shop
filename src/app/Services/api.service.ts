import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { LoginResponse } from 'src/app/Models/Backend/LoginResponse';
import { RefreshTokenResponse } from 'src/app/Models/Backend/RefreshTokenResponse';
import { User } from '../Models/Backend/User';

const API_KEY = 'https://localhost:7243/api/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_KEY + 'Authentication/login', {
      Email: credentials.Email,
      Password: credentials.Password,
    });
  }

  sendRefreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      API_KEY + 'Authentication/refresh',
      {
        refreshToken: refreshToken,
      }
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(API_KEY + 'User/getCurrent');
  }
}
