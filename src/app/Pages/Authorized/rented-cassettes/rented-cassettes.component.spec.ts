/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RentedCassettesComponent } from './rented-cassettes.component';

describe('RentedCassettesComponent', () => {
  let component: RentedCassettesComponent;
  let fixture: ComponentFixture<RentedCassettesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentedCassettesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedCassettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
