import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CassetteModel } from '../Models/Backend/CassetteModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CassetteService {
  constructor(private apiService: ApiService) {}

  getAllCassettes(): Observable<CassetteModel> {
    return this.apiService.getAllCassets();
  }

  getCurrentUserRentedCassettes() {
    return this.apiService.getCurrentUserRentedCassettes();
  }

  getRentedCassetessByUserId(id: number) {
    return this.apiService.getRentedCassetessByUserId(id);
  }
}
