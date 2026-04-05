import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ApiResponse } from '../models/api-response';
import { PersonaResponse } from '../models/persona/response/persona-response';
import { map } from 'rxjs';
import { PersonaRequest } from '../models/persona/request/persona-request';

@Injectable({
  providedIn: 'root',
})
export class PersonaApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/Persona`;

  FindBuscarPersonas() {
    return this.http
      .get<ApiResponse<PersonaResponse[]>>(`${this.urlServicio}/FindBuscarPersonas`)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  GetPersonaByID(personaID: number) {
    return this.http
      .get<ApiResponse<PersonaResponse>>(`${this.urlServicio}/GetPersonaByID/${personaID}`)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  Save(request: PersonaRequest) {
    return this.http
      .post<ApiResponse<PersonaResponse>>(`${this.urlServicio}/save`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
  Update(request: PersonaRequest) {
    return this.http
      .put<ApiResponse<PersonaResponse>>(`${this.urlServicio}/update`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
}
