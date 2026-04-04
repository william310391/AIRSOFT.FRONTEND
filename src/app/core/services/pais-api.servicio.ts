import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { map } from 'rxjs';
import { PaisResponse } from '../models/pais/response/pais-response';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class PaisApiServicio {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/Pais`;

  GetPais() {
    return this.http
      .get<ApiResponse<PaisResponse>>(`${this.urlServicio}/getPais`)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
}
