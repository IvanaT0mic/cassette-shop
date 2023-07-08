import { Injectable } from '@angular/core';
import { User } from '../Models/Backend/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User = null;

  get user(): User {
    return JSON.parse(JSON.stringify(this._user));
  }

  get isAuthenticated(): boolean {
    return !!this._user;
  }

  constructor(private api: ApiService, private router: Router) {}

  removeUser() {
    this._user = null;
  }

  setCurrentUser(): Observable<User> {
    return this.api.getCurrentUser().pipe(
      map((res) => {
        this._user = res;
        return res;
      })
    );
  }

  hasPrivilage(privilage: number): boolean {
    return this._user.permissionIds.includes(privilage);
  }
}
