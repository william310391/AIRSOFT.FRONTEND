import { inject, Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { UsuarioRequest } from 'src/app/core/models/usuario/request/usuario-request';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';

import { UsuarioApiService } from 'src/app/core/services/usuario-api.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor() {}

  usuarios = inject(UsuarioApiService);

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

    return this.usuarios.GetUsuarioFind(request);
  }

  getRol() {
    return this.usuarios.GetRol();
  }

  getCreate(request: UsuarioRequest) {
    try {
      this.validateUsuarioRequest(request);
      return this.usuarios.Create({
        ...request,
        usuarioCuenta: request.usuarioCuenta.trim(),
        usuarioNombre: request.usuarioNombre.trim(),
        contrasena: request.contrasena.trim(),
        contrasenaConfirmar: request.contrasenaConfirmar.trim(),
        rolId: Number(request.rolId),
      });
    } catch (error) {
      return throwError(() => error);
    }
  }

  private validateUsuarioRequest(request: UsuarioRequest): void {
    if (!request.usuarioCuenta) {
      throw new Error('El usuario es requerido');
    }

    if (!request.usuarioNombre) {
      throw new Error('El nombre es requerido');
    }

    if (!request.contrasena || request.contrasena.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    if (request.contrasena !== request.contrasenaConfirmar) {
      throw new Error('Las contraseñas no coinciden');
    }

    if (!request.rolId || request.rolId <= 0) {
      throw new Error('Debe seleccionar un rol válido');
    }
  }
}
