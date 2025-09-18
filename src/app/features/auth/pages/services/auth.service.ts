import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { JwtClaims } from 'src/app/core/interfaces/JwtClaims.interface';
import { ObtenerAccesosRequest } from 'src/app/core/models/usuario/request/obtenerAccesos-request';
import { ObtenerAccesosResponse } from 'src/app/core/models/usuario/response/obtenerAccesos-response';
import { buildRoutes } from 'src/app/core/router/buildRoutes';
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
    return this.usuarioApiService.ObtenerAccesos(datos).pipe(
      tap((res) => {
        this.acceso.set(res);
        const rutas = buildRoutes(res?.listaPagina ?? []);

        // ⚠️ Importante: mantener las rutas base (login, unauthorized, etc.)
        const rutasBase = this.router.config.filter((r) => this.rutasExcluidas.includes(r.path!));

        this.router.resetConfig([...rutasBase, ...rutas]);
      })
    );
  }

  cerrarSesion() {
    JwtHelper.removeToken();
    this.router.navigate(['/login']);
  }

  setPermisos(datos: ObtenerAccesosResponse | null) {
    this.acceso.set(datos);
  }

  private rutasExcluidas = ['login', 'prueba'];

  puedeAcceder(ruta: string): boolean {
    // Normalizamos la ruta (quitamos "/" inicial si existe)
    const rutaNormalizada = ruta.startsWith('/') ? ruta.slice(1) : ruta;

    if (this.rutasExcluidas.includes(rutaNormalizada)) {
      return true;
    }

    // Buscamos coincidencia exacta
    const encontrado = this.acceso()?.listaPagina.some((x) =>
      x.paginaUrlLink.startsWith('/')
        ? x.paginaUrlLink.slice(1)
        : x.paginaUrlLink === rutaNormalizada
    );
    // console.log(ruta, !!encontrado, this.acceso()?.listaPagina);
    return !!encontrado;
  }
}
