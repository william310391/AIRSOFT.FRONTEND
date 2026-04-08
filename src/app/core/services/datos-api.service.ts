import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FindRequest } from '../models/usuario/request/find-request';
import { FindResponse } from '../models/usuario/response/find-response';
import { DatosReponse } from '../models/datos/response/datos-response';
import { DatosRequest } from '../models/datos/request/datos-request';
import { DatosChangeStateRequest } from '../models/datos/request/datosChangeState-request';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class DatosApiService extends BaseApiService {
  protected override urlService = 'api/datos';
  constructor() {
    super();
  }

  findBuscarDato(request: FindRequest) {
    return this.post<FindResponse<DatosReponse>, FindRequest>(`findBuscarDato`, request);
  }
  findByTipoDato(tipoDato: string) {
    const params = new HttpParams().set('tipoDato', tipoDato);
    return this.get<DatosReponse[]>(`findByTipoDato`, { params });
  }
  create(request: DatosRequest) {
    return this.post<DatosReponse, DatosRequest>(`create`, request);
  }

  update(request: DatosRequest) {
    return this.put<DatosReponse, DatosRequest>(`update`, request);
  }

  changeState(request: DatosChangeStateRequest) {
    return this.put<boolean, DatosChangeStateRequest>(`changeState`, request);
  }
}
