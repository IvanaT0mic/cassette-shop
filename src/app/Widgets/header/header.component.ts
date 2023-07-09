import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/Services/Auth/authorization.service';
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
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.fullName = this.userService.user.fullName;
    this.isAdmin = this.userService.hasPrivilage(3);
  }

  logout() {
    this.authorizationService.logout();
  }
}
