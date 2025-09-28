import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
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
}
