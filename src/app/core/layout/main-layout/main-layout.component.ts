import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/layout.service';
import { UsuarioApiService } from '../../services/usuario-api.service';
import { ObtenerAccesosResponse } from '../../models/usuario/response/obtenerAccesos-response';
import { ObtenerAccesosRequest } from '../../models/usuario/request/obtenerAccesos-request';
import NavbarMovilComponent from './navbar-movil/navbar-movil.component';
import NavbarDeskComponent from './navbar-desk/navbar-desk.component';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarMovilComponent, NavbarDeskComponent],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayoutComponent {
  authService = inject(AuthService);
  usuarioApiService = inject(UsuarioApiService);

  datosUsuarios = signal<ObtenerAccesosResponse | null>(null);

  constructor() {
    this.usuarioApiService.ObtenerAccesos(this.cargarDatos());
  }

  cargarDatos(): ObtenerAccesosRequest {
    return {
      usuarioID: this.authService.datosUsuario()?.usuarioID ?? 0,
    };
  }
}
