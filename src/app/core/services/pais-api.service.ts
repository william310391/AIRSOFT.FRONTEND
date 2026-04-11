import { Injectable } from '@angular/core';
import { PaisResponse } from '../models/pais/response/pais-response';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PaisApiServicio extends BaseApiService {
  protected override urlService = 'api/Pais';
  constructor() {
    super();
  }
  GetPais() {
    return this.get<PaisResponse[]>(`getPais`);
  }
}
