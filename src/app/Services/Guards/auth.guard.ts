import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthorizationService } from '../Auth/authorization.service';
import { Observable, map, of } from 'rxjs';
import { ConstRouteService } from '../Const/const-route.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
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

    return this.userService.setCurrentUser().pipe(
      map(() => {
        return true;
      })
    );
  }
}
