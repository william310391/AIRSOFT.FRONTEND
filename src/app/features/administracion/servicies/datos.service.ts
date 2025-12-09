import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { DatosApiService } from 'src/app/core/services/datos-api.service';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  constructor() {}
  datosService = inject(DatosApiService);
  errorHandler = inject(ErrorHandlerService);

  findBuscarDato(request: FindRequest): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => () => {}, //VALIDAS DATOS
      (data) => this.sanitizeFindRequest(data), // FORMATEAS DATOS
      (data) => this.datosService.findBuscarDato(data) // EJECUTAS PETICION HTTP
    );
  }

  private sanitizeFindRequest(request: FindRequest): FindRequest {
    return {
      ...request,
      pagina: request.pagina || 1,
      tamanoPagina: request.tamanoPagina || 10,
    };
  }
}
