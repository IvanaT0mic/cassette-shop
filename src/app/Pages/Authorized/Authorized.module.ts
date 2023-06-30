import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Widgets/header/header.component';
import { AuthorizedComponent } from './Authorized.component';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { SharedModule } from 'src/app/Shared/shared/shared.module';

@NgModule({
  imports: [CommonModule, AuthorizedRoutingModule, SharedModule],
  declarations: [
    //PAGES
    AuthorizedComponent,

    //Widgets
    HeaderComponent,
  ],
})
export class AuthorizedModule {}
