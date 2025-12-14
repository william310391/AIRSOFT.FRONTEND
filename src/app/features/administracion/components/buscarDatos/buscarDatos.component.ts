import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { DatosService } from '../../servicies/datos.service';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { DatosReponse } from 'src/app/core/models/datos/response/datos-response';
import { Search } from 'src/app/shared/components/search/search.component';
import { PaginacionComponent } from 'src/app/shared/components/paginacion/paginacion.component';
import { ListarDatosComponent } from '../listarDatos/listarDatos.component';

@Component({
  selector: 'app-buscar-datos',
  imports: [Search, PaginacionComponent, ListarDatosComponent],
  templateUrl: './buscarDatos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscarDatos {
  accionNuevo = input.required<() => void>();
  buscar = signal<string>('');

  datosService = inject(DatosService);
  sharedService = inject(LoadingService);

  currentPage = signal(1);
  totalPages = signal(1);
  pageSize = 10;

  ListaDatos = signal<FindResponse<DatosReponse>>({
    datos: [],
    pagina: 1,
    tamanoPagina: 10,
    totalRegistros: 0,
    totalPaginas: 0,
    tienePaginaAnterior: false,
    tienePaginaSiguiente: false,
  });

  buscarDatos = (buscar: string) => {
    this.sharedService.isLandingPage.set(true); // 👈 comienza la carga
    this.buscar.set(buscar);
    const request = {
      buscar: buscar,
      pagina: this.currentPage(),
      tamanoPagina: this.pageSize,
    };

    this.datosService.findBuscarDato(request).subscribe({
      next: (res) => {
        if (res) {
          this.currentPage.set(res.pagina);
          this.totalPages.set(res.totalPaginas);
          this.ListaDatos.set(res);
        }
        this.sharedService.isLandingPage.set(false);
      },
      error: () => {
        this.sharedService.isLandingPage.set(false);
      },
    });
  };

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.buscarDatos(this.buscar());
    }
  }

  onBuscar() {
    this.buscarDatos(this.buscar());
  }

  onNuevo = () => {
    this.accionNuevo()();
  };
}
