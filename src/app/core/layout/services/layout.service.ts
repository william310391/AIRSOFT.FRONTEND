import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtClaims } from '../../interfaces/JwtClaims.interface';
import { JwtHelper } from '../../utils/JwtHelper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
