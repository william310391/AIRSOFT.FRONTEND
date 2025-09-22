import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';

@Component({
  selector: 'app-listar-usuario',
  imports: [],
  templateUrl: './listarUsuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarUsuarioComponent {
  datos = input.required<FindResponse<UsuarioResponse>>();
}
