import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ObtenerAccesosRequest } from 'src/app/core/models/usuario/request/obtenerAccesos-request';
import { ObtenerAccesosResponse } from 'src/app/core/models/usuario/response/obtenerAccesos-response';
import { ApiResponse } from 'src/app/core/models/api-response';
import { map } from 'rxjs';
import { FindRequest } from '../models/usuario/request/find-request';
import { UsuarioResponse } from '../models/usuario/response/usuario-response';
import { FindResponse } from '../models/usuario/response/find-response';
import { UsuarioRequest } from '../models/usuario/request/usuario-request';
import { UsuarioDeleteRequest } from '../models/usuario/request/usuarioDelete-request';
import { UsuarioChangeStateRequest } from '../models/usuario/request/usuarioChangeState-request';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/Usuario`;

  ObtenerAccesos(request: ObtenerAccesosRequest) {
    return this.http
      .post<ApiResponse<ObtenerAccesosResponse>>(`${this.urlServicio}/obtenerAccesos`, request)
      .pipe(
        map((res) => (res.success ? res.data : null)) // ✅ devuelve ObtenerAccesosResponse
      );
  }

  GetUsuarioFind(request: FindRequest) {
    return this.http
      .post<ApiResponse<FindResponse<UsuarioResponse>>>(
        `${this.urlServicio}/getUsuarioFind`,
        request
      )
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  GetRol() {
    return this.http
      .get<ApiResponse<any>>(`${this.urlServicio}/getRol`)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  Create(request: UsuarioRequest) {
    return this.http
      .post<ApiResponse<any>>(`${this.urlServicio}/create`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  Update(request: UsuarioRequest) {
    return this.http
      .post<ApiResponse<any>>(`${this.urlServicio}/update`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  Delete(request: UsuarioDeleteRequest) {
    return this.http
      .post<ApiResponse<any>>(`${this.urlServicio}/delete`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  ChangeState(request: UsuarioChangeStateRequest) {
    return this.http
      .post<ApiResponse<any>>(`${this.urlServicio}/changeState`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
}
