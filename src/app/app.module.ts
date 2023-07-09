import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Shared/shared/shared.module';
import { AuthorizedComponent } from './Pages/Authorized/authorized.component';
import { InterceptorService } from './Services/interceptor.service';
import { AuthorizationService } from './Services/Auth/authorization.service';
import { Observable, of } from 'rxjs';

export function getCurrentUser(authorizationService: AuthorizationService) {
  return (): Observable<void> => {
    return of(authorizationService.initService());
  };
}

@NgModule({
  declarations: [
    AppComponent,

    //Pages
    LoginComponent,
    AuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
    // ReactiveFormsModule,
    // RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getCurrentUser,
      deps: [AuthorizationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      // useFactory: function (authService: AuthorizationService) {
      //   return new InterceptorService(authService);
      // },
      deps: [AuthorizationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
