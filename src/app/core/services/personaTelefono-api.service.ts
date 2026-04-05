import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { PersonaTelefonoResponse } from '../models/personaTelefono/response/PersonaTelefono-Response';
import { PersonaTelefonoRequest } from '../models/personaTelefono/request/PersonaTelefono-Request';

@Injectable({
  providedIn: 'root',
})
export class PersonaTelefonoApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/PersonaTelefono`;

  GetPersonaTelefonos(personaID: number) {
    return this.http
      .get<ApiResponse<PersonaTelefonoResponse[]>>(`${this.urlServicio}/${personaID}`)
      .pipe(map((res) => (res ? res : null)));
  }

  Save(request: PersonaTelefonoRequest) {
    return this.http
      .post<ApiResponse<boolean>>(`${this.urlServicio}/save`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
  Update(request: PersonaTelefonoRequest) {
    return this.http
      .put<ApiResponse<boolean>>(`${this.urlServicio}/update`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }

  ChangeState(request: PersonaTelefonoRequest) {
    return this.http
      .put<ApiResponse<boolean>>(`${this.urlServicio}/changeState/`, request)
      .pipe(map((res) => (res.success ? res.data : null)));
  }
}
