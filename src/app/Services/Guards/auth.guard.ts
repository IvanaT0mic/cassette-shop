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

//QA 'CanActivate' is deprecated.
//so we create function
function validatePermission(
  route: ActivatedRouteSnapshot
): Observable<boolean> {
  const requiredPrivilege = route.data['requiredPrivilege'];
  const pageToNavigate = route.data['navigatePage'];

  if (!this.authorizationService.hasPrivilage(requiredPrivilege)) {
    this.router.navigate([`/${pageToNavigate}`]);
  }
  return of(true);
}

export const authGuard = () => {
  const authService = inject(AuthorizationService);
  const userService = inject(UserService);
  const router = inject(Router);
  const activatedRouteSnapshot = inject(ActivatedRouteSnapshot);

  if (!authService.isAuthorizated) {
    router.navigate[`/${ConstRouteService.login}`];
    authService.logout();
    return of(false);
  }

  if (!userService.isAuthenticated) {
    return validatePermission(activatedRouteSnapshot);
  }

  return userService.setCurrentUser().pipe(
    map(() => {
      return true;
    })
  );
};
