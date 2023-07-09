import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CassetteModel } from '../Models/Backend/CassetteModel';
import { Observable, map, of, mergeMap } from 'rxjs';
import { RentCassetteModel } from '../Models/Backend/RentCassetteModel';

@Injectable({
  providedIn: 'root',
})
export class CassetteService {
  cassettesData: Array<CassetteModel> = null;

  constructor(private apiService: ApiService) {}

  getAllCassettes(): Observable<Array<CassetteModel>> {
    if (this.cassettesData == null) {
      return this.apiService.getAllCassets().pipe(
        map((x) => {
          this.cassettesData = x;
          return this.cassettesData;
        })
      );
    }
    return of(this.cassettesData);
  }

  getById(id: number): CassetteModel {
    let data = this.cassettesData.find((x) => x.id == id);
    return data;
  }

  getCurrentUserRentedCassettes() {
    return this.apiService.getCurrentUserRentedCassettes();
  }

  getRentedCassetessByUserId(id: number) {
    return this.apiService.getRentedCassetessByUserId(id);
  }

  createCassette(cassette: CassetteModel): Observable<any> {
    return this.apiService.createCassette(cassette).pipe(
      mergeMap(() => {
        return this.apiService.getAllCassets().pipe(
          map((x) => {
            this.cassettesData = x;
          })
        );
      })
    );
  }

  rentCassette(rentModel: RentCassetteModel): Observable<any> {
    return this.apiService.rentCassette(rentModel);
  }

  returnCassette(rentModel: RentCassetteModel): Observable<any> {
    return this.apiService.returnCassette(rentModel);
  }
}
