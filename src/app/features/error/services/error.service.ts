import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_STATUS_CODES, HttpStatus } from '../constants/HTTP_STATUS_CODES';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router) {}
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
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/prueba']);
    }
  }
}
