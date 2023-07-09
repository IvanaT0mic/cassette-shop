import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/Backend/LoginCredentials';
import { LoginResponse } from 'src/app/Models/Backend/LoginResponse';
import { RefreshTokenResponse } from 'src/app/Models/Backend/RefreshTokenResponse';
import { User } from '../Models/Backend/User';
import { CassetteModel } from '../Models/Backend/CassetteModel';

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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(API_KEY + 'Authentication/getById/' + id);
  }

  sendRefreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      API_KEY + 'Authentication/refresh',
      {
        refreshToken: refreshToken,
      }
    );
  }

  getAllCassets(): Observable<any> {
    return this.http.get<any>(API_KEY + 'Cassette/GetAllCassettes');
  }

  getCurrentUserRentedCassettes(): Observable<CassetteModel> {
    return this.http.get<CassetteModel>(
      API_KEY + 'Cassette/GetCurrentUSersCassettes'
    );
  }

  getRentedCassetessByUserId(id: number): Observable<any> {
    return this.http.get<CassetteModel>(
      API_KEY + 'Cassette/GetCassettesByUserId/' + id
    );
  }

  getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(API_KEY + 'User/');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(API_KEY + 'User/getCurrent');
  }
}
