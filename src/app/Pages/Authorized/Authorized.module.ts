import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Widgets/header/header.component';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { CassetteManagmentPageComponent } from './cassette-managment-page/cassette-managment-page.component';
import { CassetteViewComponent } from './cassette-view/cassette-view.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthorizedRoutingModule,
    SharedModule,
  ],
  declarations: [
    //PAGES
    CassetteManagmentPageComponent,
    CassetteViewComponent,
    ProfileComponent,
    UsersManagmentComponent,
    UserRegisterComponent,
  ],
  exports: [CommonModule, ReactiveFormsModule],
})
export class AuthorizedModule {}
