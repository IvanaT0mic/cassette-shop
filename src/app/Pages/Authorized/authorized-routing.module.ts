import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { CassetteViewComponent } from './cassette-view/cassette-view.component';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { AuthGuardService } from 'src/app/Services/Guards/auth.guard';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { ProfileComponent } from './profile/profile.component';
import { IsAdminGuard } from 'src/app/Services/Guards/IsAdmin.guard';
import { CassetteManagmentPageComponent } from './cassette-managment-page/cassette-managment-page.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: ConstRouteService.manageUsers,
        component: UsersManagmentComponent,
      },
      {
        path: ConstRouteService.profile,
        component: ProfileComponent,
      },
      {
        path: ConstRouteService.profile + '/:id',
        component: ProfileComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: ConstRouteService.register,
        component: UserRegisterComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: ConstRouteService.manageCassettes,
        component: CassetteManagmentPageComponent,
        canActivate: [IsAdminGuard],
      },

      {
        path: ConstRouteService.manageCassettes + '/:id',
        component: CassetteManagmentPageComponent,
        canActivate: [IsAdminGuard],
      },
      {
        path: ConstRouteService.cassetts,
        component: CassetteViewComponent,
      },
      { path: '', redirectTo: ConstRouteService.cassetts, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizedRoutingModule {}
