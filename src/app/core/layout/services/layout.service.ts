import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClaims } from '../../interfaces/JwtClaims.interface';
import { JwtHelper } from '../../utils/JwtHelper';
import { Menu } from '../models/menu';
import { AuthService } from 'src/app/features/auth/pages/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  datosUsuario = signal<JwtClaims | null>(JwtHelper.getClaimsAll());
  authServicio = inject(AuthService);
  constructor(private router: Router) {
    if (this.datosUsuario() == null) {
      this.router.navigate(['/login']);
    }
  }
  menus = computed<Menu[]>(() => {
    const datos = this.authServicio.acceso()?.listaPagina;
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
