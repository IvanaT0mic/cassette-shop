import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { ConstRouteService } from './Services/Const/const-route.service';

const routes: Routes = [
  {
    path: ConstRouteService.login,
    component: LoginComponent,
  },
  {
    path: ConstRouteService.home,
    loadChildren: () =>
      import('./Pages/Authorized/authorized.module').then(
        (x) => x.AuthorizedModule
      ),
  },
  { path: '', redirectTo: ConstRouteService.login, pathMatch: 'full' },
  { path: '**', redirectTo: ConstRouteService.login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
