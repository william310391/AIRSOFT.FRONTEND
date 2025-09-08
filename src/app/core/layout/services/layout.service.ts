import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClaims } from '../../interfaces/JwtClaims.interface';
import { JwtHelper } from '../../utils/JwtHelper';
import { UsuarioApiService } from '../../services/usuario-api.service';
import { ObtenerAccesosRequest } from '../../models/usuario/request/obtenerAccesos-request';
import { ObtenerAccesosResponse } from '../../models/usuario/response/obtenerAccesos-response';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  datosUsuario = signal<JwtClaims | null>(JwtHelper.getClaimsAll());
  acceso = signal<ObtenerAccesosResponse | null>(null);
  usuarioApiService = inject(UsuarioApiService);

  constructor(private router: Router) {
    this.usuarioApiService
      .ObtenerAccesos(this.cargarDatos())
      .subscribe((res) => this.acceso.set(res));

    if (this.datosUsuario() == null) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    JwtHelper.removeToken();
    this.router.navigate(['/login']);
  }

  cargarDatos(): ObtenerAccesosRequest {
    return {
      usuarioID: this.datosUsuario()?.usuarioID ?? 0,
    };
  }

  menus = computed<Menu[]>(() => {
    const datos = this.acceso()?.listaPagina;
    if (!datos) return []; // manejamos el caso null ✅

    return Object.values(
      datos.reduce((acc, item) => {
        if (!acc[item.menuNombre]) {
          acc[item.menuNombre] = {
            menuNombre: item.menuNombre,
            menuIcono: item.menuIcono,
            menuUrlLink: item.menuUrlLink,
            paginas: [],
          };
        }
        acc[item.menuNombre].paginas.push({
          paginaNombre: item.paginaNombre,
          paginaIcono: item.paginaIcono,
          paginaUrlLink: item.paginaUrlLink,
        });
        console.log(acc);
        return acc;
      }, {} as Record<string, Menu>)
    );
  });
}
