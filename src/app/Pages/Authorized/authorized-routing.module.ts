import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { CanRentGuard } from 'src/app/Services/Guards/CanRent.guard';
import { IsAdminGuard } from 'src/app/Services/Guards/IsAdmin.guard';
import { AuthGuardService } from 'src/app/Services/Guards/auth.guard';
import { AuthorizedComponent } from './Authorized.component';
import { CassetteManagmentPageComponent } from './cassette-managment-page/cassette-managment-page.component';
import { CassetteViewComponent } from './cassette-view/cassette-view.component';
import { ProfileComponent } from './profile/profile.component';
import { RentedCassettesComponent } from './rented-cassettes/rented-cassettes.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: ConstRouteService.manageUsers,
        component: UsersManagmentComponent,
        canActivate: [IsAdminGuard],
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
        path: ConstRouteService.myCassetts + '/:id',
        component: RentedCassettesComponent,
        canActivate: [CanRentGuard],
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
