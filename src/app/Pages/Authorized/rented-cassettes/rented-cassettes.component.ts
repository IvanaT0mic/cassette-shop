import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { CassetteModel } from 'src/app/Models/Backend/CassetteModel';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { CassetteService } from 'src/app/Services/cassette.service';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rented-cassettes',
  templateUrl: './rented-cassettes.component.html',
  styleUrls: ['./rented-cassettes.component.scss'],
})
export class RentedCassettesComponent
  extends CommonComponent
  implements OnInit
{
  cassettes: Array<CassetteModel> = new Array<CassetteModel>();
  idExist: boolean = false;
  cassettsManage: boolean = true;

  constructor(
    private cassetteService: CassetteService,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id == undefined) {
      this.cassetteService
        .getCurrentUserRentedCassettes()
        .pipe(takeUntil(this.localNgUnsubscribe))
        .subscribe((res) => {
          this.cassettes = res;
          return;
        });
    }
    this.idExist = true;
    this.cassetteService
      .getRentedCassetessByUserId(Number(id))
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        this.cassettes = res;
        this.cassettsManage = this.userService.user.id == Number(id);
        return;
      });
  }
}
