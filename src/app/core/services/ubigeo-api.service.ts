import { Injectable } from '@angular/core';
import { UbigeoResponse } from '../models/ubigeo/response/ubigeo-response';
import { BaseApiService } from './base-api.service';
@Injectable({
  providedIn: 'root',
})
export class UbigeoApiService extends BaseApiService {
  protected override urlService = 'api/Ubigeo';
  constructor() {
    super();
  }
  GetDepartamentos() {
    return this.get<UbigeoResponse[]>(`getDepartamentos`);
  }
  GetProvincias(departamentoID: number) {
    return this.get<UbigeoResponse[]>(`getProvincias/${departamentoID}`);
  }
  GetDistritos(departamentoID: number, provinciaID: number) {
    return this.get<UbigeoResponse[]>(`getDistritos/${departamentoID}/${provinciaID}`);
  }
}
