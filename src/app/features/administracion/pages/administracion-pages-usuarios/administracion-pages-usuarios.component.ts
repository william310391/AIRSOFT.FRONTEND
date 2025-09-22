import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BuscarUsuariosComponent } from '../../components/buscarUsuarios/buscarUsuarios.component';

@Component({
  selector: 'app-administracion-pages-usuarios',
  imports: [BuscarUsuariosComponent],
  templateUrl: './administracion-pages-usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdministracionPagesUsuariosComponent {}
