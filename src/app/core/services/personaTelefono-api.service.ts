import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { PersonaTelefonoResponse } from '../models/personaTelefono/response/PersonaTelefono-Response';
import { PersonaTelefonoRequest } from '../models/personaTelefono/request/PersonaTelefono-Request';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaTelefonoApiService extends BaseApiService {
  protected override urlService = 'api/PersonaTelefono';
  constructor() {
    super();
  }

  GetPersonaTelefonos(personaID: number) {
    return this.get<PersonaTelefonoResponse[]>(`GetPersonaTelefonos/${personaID}`);
  }
  Save(request: PersonaTelefonoRequest) {
    return this.post<boolean, PersonaTelefonoRequest>(`save`, request);
  }
  Update(request: PersonaTelefonoRequest) {
    return this.put<boolean, PersonaTelefonoRequest>(`update`, request);
  }
  ChangeState(request: PersonaTelefonoRequest) {
    return this.put<boolean, PersonaTelefonoRequest>(`changeState`, request);
  }
}
