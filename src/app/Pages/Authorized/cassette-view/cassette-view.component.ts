import { takeUntil } from 'rxjs';
import { CassetteService } from './../../../Services/cassette.service';
import { Component, OnInit } from '@angular/core';
import { CassetteModel } from 'src/app/Models/Backend/CassetteModel';
import { User } from 'src/app/Models/Backend/User';
import { UserService } from 'src/app/Services/user.service';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { PermissionEnum } from 'src/app/Services/Const/PermissionEnum.enum';

@Component({
  selector: 'app-cassette-view',
  templateUrl: './cassette-view.component.html',
  styleUrls: ['./cassette-view.component.scss'],
})
export class CassetteViewComponent extends CommonComponent implements OnInit {
  user: User;
  rentCassette: boolean = false;
  cassettes: Array<CassetteModel> = new Array<CassetteModel>();

  constructor(
    private userService: UserService,
    private cassetteService: CassetteService
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.userService.user;
    this.rentCassette = this.userService.hasPrivilage(PermissionEnum.canRent);
    this.cassetteService
      .getAllCassettes()
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        res.forEach((element) => {
          this.cassettes.push(element);
        });
      });
  }
}
