import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { UsuarioRequest } from 'src/app/core/models/usuario/request/usuario-request';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';

import { UsuarioApiService } from 'src/app/core/services/usuario-api.service';
import { BackendError, FrontendValidationError } from 'src/app/shared/interfaces/error';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor() {}

  usuarios = inject(UsuarioApiService);
  errorHandler = inject(ErrorHandlerService);

  getUsuarioFind(request: FindRequest) {
    // if (!request.buscar || request.buscar.length < 3) {
    //   return of({
    //     datos: [],
    //     pagina: 1,
    //     tamanoPagina: 10,
    //     totalRegistros: 0,
    //     totalPaginas: 0,
    //     tienePaginaAnterior: false,
    //     tienePaginaSiguiente: false,
    //   } as FindResponse<UsuarioResponse>);
    // }

    of({
      datos: [],
      pagina: 1,
      tamanoPagina: 10,
      totalRegistros: 0,
      totalPaginas: 0,
      tienePaginaAnterior: false,
      tienePaginaSiguiente: false,
    } as FindResponse<UsuarioResponse>);

    // Defaults de paginación
    request.pagina = request.pagina || 1;
    request.tamanoPagina = request.tamanoPagina || 10;

    //return this.usuarios.GetUsuarioFind(request);
    return this.errorHandler.execute(() => this.usuarios.GetUsuarioFind(request));
  }

  getRol(): Observable<any> {
    return this.errorHandler.execute(() => this.usuarios.GetRol());
  }

  create(request: UsuarioRequest): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validateUsuarioRequest(data), //VALIDAS DATOS
      (data) => this.sanitizeRequest(data), // FORMATEAS DATOS
      (sanitized) => this.usuarios.Create(sanitized) // EJECUTAS PETICION HTTP
    );
  }

  // create(request: UsuarioRequest): Observable<any> {
  //   return this.executeWithValidation(request, (sanitized) => this.usuarios.Create(sanitized));
  // }

  //validaciones
  // private executeWithValidation(
  //   request: UsuarioRequest,
  //   apiCall: (sanitized: UsuarioRequest) => Observable<any>
  // ): Observable<any> {
  //   try {
  //     // Validación de frontend
  //     this.validateUsuarioRequest(request);

  //     // Sanitizar datos
  //     const sanitizedRequest = this.sanitizeRequest(request);

  //     // Llamar al backend con manejo de errores
  //     return apiCall(sanitizedRequest).pipe(
  //       catchError((httpError) => this.errorHandler.handleHttpError(httpError))
  //     );
  //   } catch (error) {
  //     return this.errorHandler.handleValidationError(error);
  //   }
  // }

  private sanitizeRequest(request: UsuarioRequest): UsuarioRequest {
    return {
      ...request,
      usuarioCuenta: request.usuarioCuenta.trim(),
      usuarioNombre: request.usuarioNombre.trim(),
      contrasena: request.contrasena.trim(),
      contrasenaConfirmar: request.contrasenaConfirmar.trim(),
      rolId: Number(request.rolId),
    };
  }

  // private handleHttpError(httpError: any): Observable<never> {
  //   const backendError = new BackendError(
  //     httpError.error?.Message || 'Error del servidor',
  //     httpError.status,
  //     httpError.error?.Message
  //   );

  //   console.log('Backend Error:', backendError);
  //   this.errorHandler.handle(backendError);

  //   return throwError(() => backendError);
  // }

  // private handleValidationError(error: any): Observable<never> {
  //   const frontendError =
  //     error instanceof FrontendValidationError
  //       ? error
  //       : new FrontendValidationError(
  //           error instanceof Error ? error.message : 'Error de validación'
  //         );

  //   this.errorHandler.handle(frontendError);

  //   return throwError(() => frontendError);
  // }

  private validateUsuarioRequest(request: UsuarioRequest): void {
    if (!request.usuarioCuenta?.trim()) {
      throw new FrontendValidationError('El usuario es requerido');
    }

    if (!request.usuarioNombre?.trim()) {
      throw new FrontendValidationError('El nombre es requerido');
    }

    if (!request.contrasena || request.contrasena.length < 8) {
      throw new FrontendValidationError('La contraseña debe tener al menos 8 caracteres');
    }

    if (request.contrasena !== request.contrasenaConfirmar) {
      throw new FrontendValidationError('Las contraseñas no coinciden');
    }

    if (!request.rolId || request.rolId <= 0) {
      throw new FrontendValidationError('Debe seleccionar un rol válido');
    }
  }
}
