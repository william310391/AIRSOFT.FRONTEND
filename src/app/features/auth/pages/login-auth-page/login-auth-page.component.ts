import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '@core/models/auth/request/login-request';
import { AuthApiService } from '@core/services/auth-api.service';
import { AuthService } from '../services/auth.service';
import { buildRoutes } from '@core/router/buildRoutes';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login-auth-page',
  styleUrls: ['./login-auth-page.component.css'],
  templateUrl: './login-auth-page.component.html',
})
export default class LoginAuthPageComponent {
  constructor(private router: Router) {}
  apiServicio = inject(AuthApiService);
  authServicio = inject(AuthService);

  usuarioCuenta = signal<string>('');
  password = signal<string>('');

  isLoading = signal<boolean>(false);
  isError = signal<boolean>(false);
  messageError = signal<string>('');

  login() {
    this.isLoading.set(true);
    this.isError.set(false);
    this.messageError.set('');

    const datos = this.cargarDatos();

    this.apiServicio
      .login(datos)
      .pipe(
        switchMap((res) => {
          if (!res) {
            throw new Error('Error en la autenticación');
          }
          return this.authServicio.ObtenerPermisos({
            usuarioID: res.usuarioId ?? 0,
          });
        }),
        tap((resPermisos) => {
          // 1. Guardar permisos
          this.authServicio.setPermisos(this.authServicio.acceso());

          // 2. Construir rutas
          const rutas = buildRoutes(this.authServicio.acceso()?.listaPagina ?? []);

          // 3. Resetear rutas
          this.router.resetConfig(rutas);

          // 4. Navegar
          this.router.navigate(['/prueba']);
        }),
        catchError((err) => {
          this.isError.set(true);
          this.messageError.set(err?.error?.Message || err.message || 'Error inesperado');
          return of(null);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe();
  }

  cargarDatos(): LoginRequest {
    return {
      usuarioCuenta: this.usuarioCuenta(),
      password: this.password(),
    };
  }

  ocultarError() {
    this.isError.set(false);
  }
}
