import { Component, inject } from '@angular/core';
import { DatosService } from '../../servicies/datos.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { FindRequest } from 'src/app/core/models/usuario/request/find-request';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-administracion-pages-datos',
  templateUrl: './administracion-pages-datos.html',
})
export default class AdministracionPagesDatos {
  datosService = inject(DatosService);
  sharedService = inject(LoadingService);

  findBuscarDato = (req: FindRequest) => {
    this.sharedService.isLandingPage.set(true);

    return this.datosService.findBuscarDato(req).pipe(
      finalize(() => {
        this.sharedService.isLandingPage.set(false);
      })
    );
  };
}
