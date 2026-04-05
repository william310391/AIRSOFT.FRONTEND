import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PersonaCorreoResponse } from '../models/personaCorreo/response/personaCorreo-response';
import { ApiResponse } from '../models/api-response';
import { map } from 'rxjs';
import { PersonaCorreoRequest } from '../models/personaCorreo/request/PersonaCorreo-request';

@Injectable({
  providedIn: 'root',
})
export class PersonaCorreoApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/PersonaCorreo`;

  GetPersonaCorreos(personaID: number) {
    return this.http
      .get<
        ApiResponse<PersonaCorreoResponse[]>
      >(`${this.urlServicio}/getPersonaCorreos/${personaID}`)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
  Save(request: PersonaCorreoRequest) {
    return this.http
      .post<ApiResponse<boolean>>(`${this.urlServicio}/save`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
  Update(request: PersonaCorreoRequest) {
    return this.http
      .put<ApiResponse<boolean>>(`${this.urlServicio}/update`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
}
