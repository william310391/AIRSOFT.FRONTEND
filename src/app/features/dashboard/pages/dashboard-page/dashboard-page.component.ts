import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarMovilComponent } from '../../components/navbar-movil/navbar-movil.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ObtenerAccesosResponse } from '../../models/response/obtenerAccesos-response';
import { ObtenerAccesosRequest } from '../../models/request/obtenerAccesos-request';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, NavbarComponent, NavbarMovilComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export default class DashboardPageComponent {
  authService = inject(AuthService);
  dashboardApiService = inject(DashboardApiService);

  datosUsuarios = signal<ObtenerAccesosResponse | null>(null);

  constructor() {
    this.dashboardApiService.ObtenerAccesos(this.cargarDatos());
  }

  cargarDatos(): ObtenerAccesosRequest {
    return {
      usuarioID: this.authService.datosUsuario()?.usuarioID ?? 0,
    };
  }
}
