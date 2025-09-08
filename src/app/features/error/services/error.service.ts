import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_STATUS_CODES, HttpStatus } from '../constants/HTTP_STATUS_CODES';
import { LayoutService } from 'src/app/core/layout/services/layout.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router) {}
  layoutService = inject(LayoutService);
  getStatus(code: number | string): HttpStatus {
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
      this.layoutService.cerrarSesion();
    } else {
      this.router.navigate(['/prueba']);
    }
  }
}
