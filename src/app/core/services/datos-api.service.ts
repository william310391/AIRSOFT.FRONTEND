import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { FindRequest } from '../models/usuario/request/find-request';
import { FindResponse } from '../models/usuario/response/find-response';
import { ApiResponse } from '../models/api-response';
import { DatosReponse } from '../models/datos/response/datos-response';
import { map } from 'rxjs';

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
}
