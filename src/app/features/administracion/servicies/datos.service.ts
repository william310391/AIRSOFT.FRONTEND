import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosRequest } from 'src/app/core/models/datos/request/datos-request';
import { DatosChangeStateRequest } from 'src/app/core/models/datos/request/datosChangeState-request';
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

  changeState(request: DatosChangeStateRequest): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validarChangeState(data), //VALIDAS DATOS
      (data) => data, // FORMATEAS DATOS
      (data) => this.datosService.changeState(data) // EJECUTAS PETICION HTTP
    );
  }

  ProcesarDato(request: DatosRequest, isCreate: boolean): Observable<any> {
    console.log(request, isCreate);
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validarProcesarDato(data, isCreate), //VALIDAS DATOS
      (data) => this.sanitizeProcesarDato(data), // FORMATEAS DATOS
      (data) => (isCreate ? this.datosService.create(data) : this.datosService.udpate(request)) // EJECUTAS PETICION HTTP
    );
  }

  private validarChangeState(request: DatosChangeStateRequest): void {
    if (!request.datoID || request.datoID <= 0) {
      throw { field: 'datoID', message: 'El ID del dato es obligatorio.' };
    }
  }

  //Validar
  private validarProcesarDato(request: DatosRequest, isCreate: boolean): void {
    if (isCreate && (!request.tipoDato || request.tipoDato.trim() === '')) {
      throw { field: 'tipoDato', message: 'El tipo de dato es obligatorio.' };
    }
    if (!isCreate && (!request.datoID || request.datoID == undefined)) {
      throw { field: 'datoID', message: 'El ID del dato es obligatorio.' };
    }
    if (!request.datoNombre || request.datoNombre.trim() === '') {
      throw { field: 'datoNombre', message: 'El nombre del dato es obligatorio.' };
    }
  }

  //sanitize
  private sanitizeFindRequest(request: FindRequest): FindRequest {
    return {
      ...request,
      pagina: request.pagina || 1,
      tamanoPagina: request.tamanoPagina || 10,
    };
  }

  private sanitizeProcesarDato(request: DatosRequest): DatosRequest {
    return {
      ...request,
      tipoDato: request.tipoDato?.trim(),
      datoID: request.datoID,
      datoNombre: request.datoNombre?.trim(),
      datoValor: request.datoValor?.trim(),
    };
  }
}
