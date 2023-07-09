import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
import { User } from '../Models/Backend/User';
import { UserForUpdate } from '../Models/Backend/UserForUpdate';
import { CreateUser } from '../Models/Backend/CreateUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User = null;

  get user(): User {
    //QA vracamo deep copy
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
        this.setPermission(this._user);
        return res;
      })
    );
  }

  setPermission(user: User) {
    //QA BE method for returining permissions doesnt work
    user.permissionIds = new Array();
    switch (user.email) {
      case 'admin@admin.com':
        user.permissionIds = [1, 2, 3, 4];
        break;
      case 'guest@guest.com':
        user.permissionIds = [1];
        break;
      default:
        user.permissionIds = [1, 2];
    }
  }

  hasPrivilage(privilage: number): boolean {
    return this._user.permissionIds.includes(privilage);
  }

  getAllUsers(): Observable<Array<User>> {
    return this.api.getAllUsers();
  }

  getUserById(id: number): Observable<User> {
    return this.api.getUserById(id);
  }

  updateUser(user: UserForUpdate): Observable<any> {
    return this.api.updateUser(user.id, user).pipe(
      mergeMap(() => {
        return this.setCurrentUser();
      })
    );
  }

  registerUser(user: CreateUser): Observable<any> {
    return this.api.registerUser(user);
  }
}
