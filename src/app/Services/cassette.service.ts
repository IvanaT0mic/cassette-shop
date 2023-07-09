import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CassetteModel } from '../Models/Backend/CassetteModel';
import { Observable, map, of } from 'rxjs';

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

  getCurrentUserRentedCassettes() {
    return this.apiService.getCurrentUserRentedCassettes();
  }

  getRentedCassetessByUserId(id: number) {
    return this.apiService.getRentedCassetessByUserId(id);
  }
}
