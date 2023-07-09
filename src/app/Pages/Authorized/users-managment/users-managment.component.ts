import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeUntil } from 'rxjs';
import { User } from 'src/app/Models/Backend/User';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html',
  styleUrls: ['./users-managment.component.scss'],
})
export class UsersManagmentComponent extends CommonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'email', 'actions'];
  dataSource: Array<User> = new Array();

  constructor(private userService: UserService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.userService
      .getAllUsers()
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        this.dataSource = res;
      });
  }

  addUser(): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.register}`,
    ]);
  }

  editUser(user: User): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.profile}/` + user.id,
    ]);
  }
}
