import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AuthorizedComponent } from './Pages/Authorized/Authorized.component';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { TestComponent } from './Pages/Unauthorized/test/test.component';
import { AuthorizationService } from './Services/Auth/authorization.service';
import { InterceptorService } from './Services/Interceptor.service';
import { SharedModule } from './Shared/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    TestComponent,
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
