import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { UsuarioRequest } from 'src/app/core/models/usuario/request/usuario-request';
import { UsuarioChangeStateRequest } from 'src/app/core/models/usuario/request/usuarioChangeState-request';
import { UsuarioDeleteRequest } from 'src/app/core/models/usuario/request/usuarioDelete-request';

import { UsuarioApiService } from 'src/app/core/services/usuario-api.service';
import { FrontendValidationError } from 'src/app/shared/interfaces/error';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor() {}

  usuarios = inject(UsuarioApiService);
  errorHandler = inject(ErrorHandlerService);

  // #region peticiones API
  getRol(): Observable<any> {
    return this.errorHandler.execute(() => this.usuarios.GetRol());
  }

  getUsuarioFind(request: FindRequest): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validargetUsuarioFindRequest(data), //VALIDAS DATOS
      (data) => this.sanitizeFindRequest(data), // FORMATEAS DATOS
      (sanitized) => this.usuarios.GetUsuarioFind(sanitized) // EJECUTAS PETICION HTTP
    );
  }

  ProcesarUsuario(request: UsuarioRequest, isCreate: boolean): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validateUsuarioRequest(data, isCreate), //VALIDAS DATOS
      (data) => this.sanitizeRequest(data), // FORMATEAS DATOS
      (sanitized) => (isCreate ? this.usuarios.Create(sanitized) : this.usuarios.Update(sanitized)) // EJECUTAS PETICION HTTP
    );
  }

  DeleteUsuario(request: UsuarioDeleteRequest): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validarUsuarioDeleteRequest(data), //VALIDAS DATOS
      (data) => this.sanitizeUsuarioDeleteRequest(data), // FORMATEAS DATOS
      (sanitized) => this.usuarios.Delete(sanitized) // EJECUTAS PETICION HTTP
    );
  }

  ChangeState(request: UsuarioDeleteRequest): Observable<any> {
    return this.errorHandler.executeWithValidation(
      request,
      (data) => this.validarUsuarioChangeStateRequest(data), //VALIDAS DATOS
      (data) => this.sanitizeUsuarioChangeStateRequest(data), // FORMATEAS DATOS
      (sanitized) => this.usuarios.ChangeState(sanitized) // EJECUTAS PETICION HTTP
    );
  }
  // #endregion

  // #region casteo de request

  private sanitizeFindRequest(request: FindRequest): FindRequest {
    return {
      ...request,
      pagina: request.pagina || 1,
      tamanoPagina: request.tamanoPagina || 10,
    };
  }

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

  private sanitizeUsuarioDeleteRequest(request: UsuarioDeleteRequest): UsuarioDeleteRequest {
    return {
      ...request,
      usuarioID: Number(request.usuarioID),
    };
  }

  private sanitizeUsuarioChangeStateRequest(
    request: UsuarioChangeStateRequest
  ): UsuarioChangeStateRequest {
    return {
      ...request,
      usuarioID: Number(request.usuarioID),
    };
  }
  // #endregion

  // #region Validacion
  private validargetUsuarioFindRequest(request: FindRequest) {
    //validacion Pendiente
  }

  private validarUsuarioDeleteRequest(request: UsuarioDeleteRequest): void {
    if (!request.usuarioID || request.usuarioID <= 0) {
      throw new FrontendValidationError('El usuarioID no es valido');
    }
  }

  private validarUsuarioChangeStateRequest(request: UsuarioChangeStateRequest): void {
    console.log(request);
    if (!request.usuarioID || request.usuarioID <= 0) {
      throw new FrontendValidationError('El usuarioID no es valido');
    }
  }

  private validateUsuarioRequest(request: UsuarioRequest, isCreate: boolean): void {
    if (!request.usuarioCuenta?.trim()) {
      throw new FrontendValidationError('El usuario es requerido');
    }

    if (!request.usuarioNombre?.trim()) {
      throw new FrontendValidationError('El nombre es requerido');
    }

    if (isCreate && (!request.contrasena || request.contrasena.length < 8)) {
      throw new FrontendValidationError('La contraseña debe tener al menos 8 caracteres');
    }

    if (isCreate && request.contrasena !== request.contrasenaConfirmar) {
      throw new FrontendValidationError('Las contraseñas no coinciden');
    }

    if (!request.rolId || request.rolId <= 0) {
      throw new FrontendValidationError('Debe seleccionar un rol válido');
    }
  }
  // #endregion
}
