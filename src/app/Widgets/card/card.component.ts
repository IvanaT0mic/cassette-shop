import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CassetteModel } from 'src/app/Models/Backend/CassetteModel';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() isAdmin: boolean;
  @Input() card: CassetteModel;
  @Input() showRentBtn: boolean;
  pictureUrl: string = 'cassette-tape';

  constructor(private router: Router) {}

  ngOnInit() {
    this.choosePictureRandom();
  }

  choosePictureRandom(): void {
    const rndInt = this.randomIntFromInterval(1, 5);
    this.pictureUrl = this.pictureUrl + rndInt + '.jpg';
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  editCassete(): void {
    this.router.navigate([
      `${ConstRouteService.home}/${ConstRouteService.manageCassettes}` +
        '/' +
        this.card.id,
    ]);
  }
}
