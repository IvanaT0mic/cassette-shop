import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { AuthorizationService } from './Auth/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) {}

  private addTokenHeader(request: HttpRequest<any>) {
    return request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authorizationService.token}`,
      }),
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //check if has token. If its not present skips interceptor logic and pass request
    if (!this.authorizationService.token) {
      return next.handle(req);
    }

    //if it has token, then we modify our requests
    const httpRequest = this.addTokenHeader(req);
    return next.handle(httpRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        //401 stands for unauthorized
        if (err.status !== 401) {
          return throwError(() => err);
        }
        if (httpRequest.url.includes('refresh')) {
          this.authorizationService.logout();
          return throwError(() => err);
        }
        return this.authorizationService.sendRefreshToken().pipe(
          mergeMap(() => {
            let request = this.addTokenHeader(req);
            return next.handle(request);
          }),
          catchError((err) => {
            this.authorizationService.logout();
            return throwError(() => err);
          })
        );
      })
    );
  }
}
