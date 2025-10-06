import { Component, inject, signal } from '@angular/core';
import { ListarUsuarioComponent } from '../listarUsuario/listarUsuario.component';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { UsuariosService } from '../../servicies/usuarios.service';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PaginacionComponent } from '../../../../shared/components/paginacion/paginacion.component';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscarUsuarios.component.html',
  imports: [ListarUsuarioComponent, PaginacionComponent],
})
export class BuscarUsuariosComponent {
  buscar = signal<string>('');
  usuarioService = inject(UsuariosService);
  sharedService = inject(LoadingService);

  currentPage = signal(1);
  totalPages = signal(1);
  pageSize = 10;
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
    this.sharedService.isLandingPage.set(true); //👈comienza la carga
    const request = this.cargarDatos();

    this.usuarioService.getUsuarioFind(request).subscribe({
      next: (res) => {
        if (res) {
          // console.log(res);
          this.currentPage.set(res.pagina);
          this.totalPages.set(res.totalPaginas);
          // Actualiza la señal con los nuevos datos
          this.ListaUsuarios.set(res);
        }
        this.sharedService.isLandingPage.set(false); // 👈 termina la carga
      },
      error: () => {
        this.sharedService.isLandingPage.set(false); // 👈 termina la carga incluso si hay error
      },
    });
  }

  cargarDatos(): FindRequest {
    return {
      buscar: this.buscar(),
      pagina: this.currentPage(),
      tamanoPagina: this.pageSize,
    };
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.buscarUsuarios();
    }
  }

  // private modalService = inject(ModalService);

  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }
  // showModal = signal(false);

  // openModal() {
  //   this.showModal.set(true);
  // }

  // closeModal() {
  //   this.showModal.set(false);
  // }
}
