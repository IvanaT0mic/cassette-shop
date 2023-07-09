import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { CassetteViewComponent } from './cassette-view/cassette-view.component';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { AuthGuardService } from 'src/app/Services/Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    canActivate: [AuthGuardService],
    // canDeactivate: [LeaveGuardService],
    // data: {
    //   requiredPrivilege: PrivilagesEnum.adminPrivilages,
    //   navigatePage: ConstService.user,
    // },
    children: [
      {
        path: ConstRouteService.cassetts,
        component: CassetteViewComponent,
      },
      { path: '', redirectTo: ConstRouteService.cassetts, pathMatch: 'full' },

      // {
      //   path: ConstService.profile,
      //   component: ProfileComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     requiredPrivilege: PrivilagesEnum.adminPrivilages,
      //     navigatePage: ConstService.user,
      //   },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedRoutingModule {}
