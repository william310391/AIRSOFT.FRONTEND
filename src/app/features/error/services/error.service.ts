import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_STATUS_CODES, HttpStatus } from '../constants/HTTP_STATUS_CODES';
import { JwtHelper } from 'src/app/core/utils/JwtHelper';
import { AuthService } from '../../auth/pages/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router) {}
  authService = inject(AuthService);
  getStatus(code: number | string): HttpStatus {
    if (Number(code) == 401) {
      JwtHelper.removeToken();
    }
    return (
      HTTP_STATUS_CODES[code.toString()] || {
        code: Number(code),
        title: 'Unknown',
        description: 'Código HTTP desconocido.',
      }
    );
  }

  volver(codeError: number | null) {
    if (codeError == 401 || codeError == null) {
      this.authService.cerrarSesion();
    } else {
      this.router.navigate(['/prueba']);
    }
  }
}
