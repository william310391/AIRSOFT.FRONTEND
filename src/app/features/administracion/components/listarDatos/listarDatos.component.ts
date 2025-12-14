import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatosReponse } from 'src/app/core/models/datos/response/datos-response';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';

@Component({
  selector: 'app-listar-datos',
  imports: [],
  templateUrl: './listarDatos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarDatosComponent {
  datos = input.required<FindResponse<DatosReponse>>();
}
