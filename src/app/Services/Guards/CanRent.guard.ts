import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ConstRouteService } from '../Const/const-route.service';
import { AuthorizationService } from '../Auth/authorization.service';
import { UserService } from '../user.service';
import { PermissionEnum } from '../Const/PermissionEnum.enum';

@Injectable({
  providedIn: 'root',
})
export class CanRentGuard implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authorizationService.isAuthorizated) {
      this.router.navigate[`/${ConstRouteService.login}`];
      this.authorizationService.logout();
      return of(false);
    }

    if (this.userService.hasPrivilage(PermissionEnum.canRent)) {
      return of(true);
    }

    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.cassetts}`,
    ]);
    return of(false);
  }
}
