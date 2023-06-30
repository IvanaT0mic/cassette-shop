import { AuthorizedComponent } from './Pages/Authorized/Authorized.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Unauthorized/login/login.component';
import { ConstService } from './Services/Const/const.service';

const routes: Routes = [
  {
    path: ConstService.login,
    component: LoginComponent,
  },
  {
    path: ConstService.home,
    loadChildren: () =>
      import('./Pages/Authorized/Authorized.module').then(
        (x) => x.AuthorizedModule
      ),
  },
  { path: '', redirectTo: ConstService.login, pathMatch: 'full' },
  { path: '**', redirectTo: ConstService.login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
