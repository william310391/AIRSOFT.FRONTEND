import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { map } from 'rxjs';
import { FindRequest } from '../models/usuario/request/find-request';
import { UsuarioResponse } from '../models/usuario/response/usuario-response';
import { FindResponse } from '../models/usuario/response/find-response';
import { UsuarioRequest } from '../models/usuario/request/usuario-request';
import { UsuarioDeleteRequest } from '../models/usuario/request/usuarioDelete-request';
import { UsuarioChangeStateRequest } from '../models/usuario/request/usuarioChangeState-request';
import { ObtenerAccesosRequest } from '../models/usuario/request/obtenerAccesos-request';
import { ObtenerAccesosResponse } from '../models/usuario/response/obtenerAccesos-response';
import { ApiResponse } from '../models/api-response';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService extends BaseApiService {
  protected override urlService = 'api/Usuario';
  constructor() {
    super();
  }

  ObtenerAccesos(request: ObtenerAccesosRequest) {
    return this.post<ObtenerAccesosResponse, ObtenerAccesosRequest>(`obtenerAccesos`, request);
  }

  GetUsuarioFind(request: FindRequest) {
    return this.post<FindResponse<UsuarioResponse>, FindRequest>(`getUsuarioFind`, request);
  }

  GetRol() {
    return this.get<ApiResponse<any>>(`getRol`);
  }

  Create(request: UsuarioRequest) {
    return this.post<any, UsuarioRequest>(`create`, request);
  }

  Update(request: UsuarioRequest) {
    return this.post<any, UsuarioRequest>(`update`, request);
  }

  Delete(request: UsuarioDeleteRequest) {
    return this.post<any, UsuarioDeleteRequest>(`delete`, request);
  }

  ChangeState(request: UsuarioChangeStateRequest) {
    return this.post<any, UsuarioChangeStateRequest>(`changeState`, request);
  }
}
