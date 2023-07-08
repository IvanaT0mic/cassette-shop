import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Widgets/header/header.component';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { SharedModule } from 'src/app/Shared/shared/shared.module';
import { AuthorizedComponent } from './authorized.component';
import { CassetteManagmentPageComponent } from './cassette-managment-page/cassette-managment-page.component';
import { CassetteViewComponent } from './cassette-view/cassette-view.component';

@NgModule({
  imports: [CommonModule, AuthorizedRoutingModule, SharedModule],
  declarations: [
    //PAGES
    CassetteManagmentPageComponent,
    CassetteViewComponent,
  ],
})
export class AuthorizedModule {}
