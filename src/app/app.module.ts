import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Shared/shared/shared.module';
import { AuthorizedComponent } from './Pages/Authorized/authorized.component';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
