import { Injectable } from '@angular/core';
import { PersonaCorreoResponse } from '../models/personaCorreo/response/personaCorreo-response';
import { PersonaCorreoRequest } from '../models/personaCorreo/request/PersonaCorreo-request';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaCorreoApiService extends BaseApiService {
  protected override urlService = 'api/PersonaCorreo';
  constructor() {
    super();
  }

  GetPersonaCorreos(personaID: number) {
    return this.get<PersonaCorreoResponse[]>(`getPersonaCorreos/${personaID}`);
  }
  Save(request: PersonaCorreoRequest) {
    return this.post<boolean, PersonaCorreoRequest>(`save`, request);
  }
  Update(request: PersonaCorreoRequest) {
    return this.put<boolean, PersonaCorreoRequest>(`update`, request);
  }
}
