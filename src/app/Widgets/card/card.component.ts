import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { CassetteModel } from 'src/app/Models/Backend/CassetteModel';
import { RentCassetteModel } from 'src/app/Models/Backend/RentCassetteModel';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { PermissionEnum } from 'src/app/Services/Const/PermissionEnum.enum';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { CassetteService } from 'src/app/Services/cassette.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends CommonComponent implements OnInit {
  @Input() card: CassetteModel;
  @Input() showRentBtn: boolean;
  isAdmin: boolean = false;
  pictureUrl: string = 'cassette-tape';
  userId: number;

  constructor(
    private router: Router,
    private cassetteService: CassetteService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.isAdmin = this.userService.hasPrivilage(
      PermissionEnum.canManageCassettes
    );
    this.choosePictureRandom();
  }

  choosePictureRandom(): void {
    const rndInt = this.randomIntFromInterval(1, 5);
    this.pictureUrl = this.pictureUrl + rndInt + '.jpg';
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rent(): void {
    let rentModel = new RentCassetteModel();
    rentModel.casseteId = this.card.id;
    rentModel.userId = this.userService.user.id;
    this.cassetteService
      .rentCassette(rentModel)
      .pipe(
        takeUntil(this.localNgUnsubscribe),
        catchError((err) => {
          //TODO popup
          return EMPTY;
        })
      )
      .subscribe();
  }

  return(): void {
    let rentModel = new RentCassetteModel();
    rentModel.casseteId = this.card.id;
    rentModel.userId = this.userService.user.id;
    this.cassetteService
      .rentCassette(rentModel)
      .pipe(
        takeUntil(this.localNgUnsubscribe),
        catchError((err) => {
          //TODO popup
          return EMPTY;
        })
      )
      .subscribe();
  }

  editCassete(): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.manageCassettes}` +
        '/' +
        this.card.id,
    ]);
  }
}
