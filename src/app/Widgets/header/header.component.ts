import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';
import { PermissionEnum } from 'src/app/Services/Const/PermissionEnum.enum';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  fullName: string = '';

  constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private route: Router
  ) {}

  ngOnInit() {
    this.fullName = this.userService.user.fullName;
    this.isAdmin = this.userService.hasPrivilage(PermissionEnum.canManageUser);
  }

  logout() {
    this.authorizationService.logout();
  }

  navigateToUsers(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.manageUsers}`,
    ]);
  }
  navigateToProfile(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.profile}`,
    ]);
  }
  navigateToCassettes(): void {
    this.route.navigate([
      `${ConstRouteService.home}/${ConstRouteService.cassetts}`,
    ]);
  }
}
