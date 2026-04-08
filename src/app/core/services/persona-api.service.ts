import { inject, Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { PersonaResponse } from '../models/persona/response/persona-response';
import { PersonaRequest } from '@core/models/persona/request/persona-request';

@Injectable({
  providedIn: 'root',
})
export class PersonaApiService extends BaseApiService {
  constructor() {
    super();
  }
  protected override urlService = 'api/persona';

  FindBuscarPersonas() {
    return this.get<PersonaResponse[]>(`FindBuscarPersonas`);
  }

  GetPersonaByID(personaID: number) {
    return this.get<PersonaResponse>(`GetPersonaByID/${personaID}`);
  }

  Save(request: PersonaRequest) {
    return this.post<PersonaResponse, PersonaRequest>(`save`, request);
  }

  Update(request: PersonaRequest) {
    return this.put<PersonaResponse, PersonaRequest>(`update`, request);
  }
}
