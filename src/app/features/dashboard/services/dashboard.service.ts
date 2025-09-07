import { Injectable, signal } from '@angular/core';
import { JwtHelper } from 'src/app/core/utils/JwtHelper';
import { JwtClaims } from 'src/app/core/interfaces/JwtClaims.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  datosUsuario = signal<JwtClaims | null>(JwtHelper.getClaimsAll());

  constructor(private router: Router) {
    if (this.datosUsuario() == null) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    JwtHelper.removeToken();
    this.router.navigate(['/login']);
  }
}
