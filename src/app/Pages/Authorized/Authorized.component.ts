import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Models/Backend/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-Authorized',
  templateUrl: './Authorized.component.html',
  styleUrls: ['./Authorized.component.scss'],
})
export class AuthorizedComponent implements OnInit {
  user: User = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
  }
}
