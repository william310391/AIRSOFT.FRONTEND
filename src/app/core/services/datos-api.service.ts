import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { FindRequest } from '../models/usuario/request/find-request';
import { FindResponse } from '../models/usuario/response/find-response';
import { ApiResponse } from '../models/api-response';
import { DatosReponse } from '../models/datos/response/datos-response';
import { map } from 'rxjs';
import { DatosRequest } from '../models/datos/request/datos-request';
import { DatosChangeStateRequest } from '../models/datos/request/datosChangeState-request';

@Injectable({
  providedIn: 'root',
})
export class DatosApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/datos`;

  findBuscarDato(request: FindRequest) {
    return this.http
      .post<ApiResponse<FindResponse<DatosReponse>>>(`${this.urlServicio}/findBuscarDato`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  findByTipoDato(tipoDato: string) {
    const params = new HttpParams().set('tipoDato', tipoDato);

    return this.http
      .get<ApiResponse<DatosReponse[]>>(`${this.urlServicio}/findByTipoDato`, { params })
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  create(request: DatosRequest) {
    return this.http
      .post<ApiResponse<DatosReponse>>(`${this.urlServicio}/create`, request)
      .pipe(map((res) => (res.success ? res.data : false)));
  }

  udpate(request: DatosRequest) {
    return this.http
      .put<ApiResponse<DatosReponse>>(`${this.urlServicio}/update`, request)
      .pipe(map((res) => (res.success ? res.data : false)));
  }
  changeState(request: DatosChangeStateRequest) {
    return this.http
      .put<ApiResponse<boolean>>(`${this.urlServicio}/changeState`, request)
      .pipe(map((res) => (res.success ? res.data : false)));
  }
}
