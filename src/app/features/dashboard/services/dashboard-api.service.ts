import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ObtenerAccesosRequest } from '../models/request/obtenerAccesos-request';
import { ApiResponse } from 'src/app/core/models/api-response';
import { ObtenerAccesosResponse } from '../models/response/obtenerAccesos-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
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
}
