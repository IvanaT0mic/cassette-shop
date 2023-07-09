import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { CassetteModel } from 'src/app/Models/Backend/CassetteModel';
import { CommonComponent } from 'src/app/Models/CommonComponent.component';
import { ConstRouteService } from 'src/app/Services/Const/const-route.service';
import { CassetteService } from 'src/app/Services/cassette.service';

@Component({
  selector: 'app-cassette-managment-page',
  templateUrl: './cassette-managment-page.component.html',
  styleUrls: ['./cassette-managment-page.component.scss'],
})
export class CassetteManagmentPageComponent
  extends CommonComponent
  implements OnInit
{
  newCassette: CassetteModel = new CassetteModel();
  cassetteForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl(''),
  });
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cassetteService: CassetteService
  ) {
    super();
  }

  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id == undefined) {
      return;
    }
    this.newCassette = this.cassetteService.getById(Number(id));
    this.createWithData();
  }

  createWithData(): void {
    this.cassetteForm = new FormGroup({
      name: new FormControl(this.newCassette.name, [Validators.required]),
      quantity: new FormControl(this.newCassette.quantity),
    });
  }

  save(): void {
    if (!this.cassetteForm.valid) {
      //TODO
      console.log('popup not valid');
      return;
    }

    this.newCassette.id = 0;
    this.newCassette.name = this.cassetteForm.get('name').value;
    this.newCassette.quantity = this.cassetteForm.get('quantity').value;

    this.cassetteService
      .createCassette(this.newCassette)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .subscribe((res) => {
        this.router.navigate([
          `${ConstRouteService.home}/${ConstRouteService.cassetts}`,
        ]);
      });
  }
}
