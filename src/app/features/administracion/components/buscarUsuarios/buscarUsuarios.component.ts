import { Component, inject, signal } from '@angular/core';
import { ListarUsuarioComponent } from '../listarUsuario/listarUsuario.component';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { UsuariosService } from '../../servicies/usuarios.service';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscarUsuarios.component.html',
  imports: [ListarUsuarioComponent],
})
export class BuscarUsuariosComponent {
  buscar = signal<string>('');
  usuarioService = inject(UsuariosService);
  // Inicializa con un estado vacío en lugar de null
  ListaUsuarios = signal<FindResponse<UsuarioResponse>>({
    datos: [],
    pagina: 1,
    tamanoPagina: 10,
    totalRegistros: 0,
    totalPaginas: 0,
    tienePaginaAnterior: false,
    tienePaginaSiguiente: false,
  });

  buscarUsuarios() {
    const request = this.cargarDatos();
    this.usuarioService.getUsuarioFind(request).subscribe((res) => {
      if (res) {
        this.ListaUsuarios.set(res);
      }
    });
  }

  cargarDatos(): FindRequest {
    return {
      buscar: this.buscar(),
      pagina: 1,
      tamanoPagina: 10,
    };
  }
}
