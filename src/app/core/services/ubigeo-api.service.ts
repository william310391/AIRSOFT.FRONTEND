import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { map } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { UbigeoResponse } from '../models/ubigeo/response/ubigeo-response';
@Injectable({
  providedIn: 'root',
})
export class UbigeoApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/Ubigeo`;

  GetDepartamentos() {
    return this.http
      .get<ApiResponse<UbigeoResponse[]>>(`${this.urlServicio}/getDepartamentos`)
      .pipe(map((res) => (res ? res : null)));
  }
  GetProvincias(departamentoID: number) {
    return this.http
      .get<ApiResponse<UbigeoResponse[]>>(`${this.urlServicio}/getProvincias/${departamentoID}`)
      .pipe(map((res) => (res ? res : null)));
  }
  GetDistritos(departamentoID: number, provinciaID: number) {
    return this.http
      .get<
        ApiResponse<UbigeoResponse[]>
      >(`${this.urlServicio}/getDistritos/${departamentoID}/${provinciaID}`)
      .pipe(map((res) => (res ? res : null)));
  }
}
