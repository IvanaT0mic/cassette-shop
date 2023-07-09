import { Component, Input, OnInit } from '@angular/core';
import { CassetteModel } from 'src/app/Models/Backend/CassetteModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: CassetteModel;
  @Input() showRentBtn: boolean;
  pictureUrl: string = 'cassette-tape';

  constructor() {}

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
}
