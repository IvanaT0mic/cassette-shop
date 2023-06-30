import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedComponent } from './Authorized.component';
import { ConstService } from 'src/app/Services/Const/const.service';
import { HomeComponent } from './Home/Home.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    // canActivate: [AuthGuardService],
    // canDeactivate: [LeaveGuardService],
    // data: {
    //   requiredPrivilege: PrivilagesEnum.adminPrivilages,
    //   navigatePage: ConstService.user,
    // },
    children: [
      { path: '', redirectTo: ConstService.home, pathMatch: 'full' },
      {
        path: ConstService.home,
        component: HomeComponent,
        // canActivate: [AuthGuardService],
        // data: {
        //   requiredPrivilege: PrivilagesEnum.adminPrivilages,
        //   navigatePage: ConstService.user,
        // },
      },
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
