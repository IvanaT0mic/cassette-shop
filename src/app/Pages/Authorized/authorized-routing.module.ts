import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { CassetteViewComponent } from './cassette-view/cassette-view.component';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { UserResolver } from 'src/app/Services/Guards/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    // canActivate: [AuthGuard],
    resolve: { user: UserResolver },
    // canDeactivate: [LeaveGuardService],
    // data: {
    //   requiredPrivilege: PrivilagesEnum.adminPrivilages,
    //   navigatePage: ConstService.user,
    // },
    children: [
      {
        path: ConstRouteService.home,
        component: CassetteViewComponent,
        // resolve: {data: BaseDataResolver}
        // canActivate: [AuthGuardService],
        data: {
          // requiredPrivilege: PrivilagesEnum.adminPrivilages,
          navigatePage: ConstRouteService.user,
        },
      },
      { path: '', redirectTo: ConstRouteService.home, pathMatch: 'full' },

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
