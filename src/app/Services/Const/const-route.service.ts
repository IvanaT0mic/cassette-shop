import { Injectable } from '@angular/core';

@Injectable()
export class ConstRouteService {
  static readonly login: string = 'login';
  static readonly home: string = 'home';
  static readonly cassetts: string = 'cassetts';
  static readonly profile: string = 'profile';
  static readonly register: string = 'register';
  static readonly rentCassetes: string = 'rent-cassettes';
  static readonly manageUsers: string = 'manage-users';
  static readonly manageCassettes: string = 'manage-cassettes';
  static readonly userInfo: string = 'user-info';

  constructor() {}
}
