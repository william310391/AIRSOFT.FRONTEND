import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClaims } from 'src/app/core/interfaces/JwtClaims.interface';
import { ObtenerAccesosRequest } from 'src/app/core/models/usuario/request/obtenerAccesos-request';
import { ObtenerAccesosResponse } from 'src/app/core/models/usuario/response/obtenerAccesos-response';
import { UsuarioApiService } from 'src/app/core/services/usuario-api.service';
import { JwtHelper } from 'src/app/core/utils/JwtHelper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  datosUsuario = signal<JwtClaims | null>(JwtHelper.getClaimsAll());
  constructor(private router: Router) {
    if (this.datosUsuario() != null) {
      this.ObtenerPermisos({
        usuarioID: this.datosUsuario()?.usuarioID ?? 0,
      });
    }
  }
  usuarioApiService = inject(UsuarioApiService);
  acceso = signal<ObtenerAccesosResponse | null>(null);

  ObtenerPermisos(datos: ObtenerAccesosRequest) {
    this.usuarioApiService.ObtenerAccesos(datos).subscribe((res) => this.acceso.set(res));
  }

  cerrarSesion() {
    JwtHelper.removeToken();
    this.router.navigate(['/login']);
  }
}
