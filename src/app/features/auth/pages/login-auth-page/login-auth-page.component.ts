import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/auth/request/login-request';
import { AuthApiService } from 'src/app/core/services/auth-api.service';
import { AuthService } from '../services/auth.service';
import { buildRoutes } from 'src/app/core/router/buildRoutes';
import { JwtHelper } from 'src/app/core/utils/JwtHelper';

@Component({
  selector: 'app-login-auth-page',
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
    var datos = this.cargarDatos();
    this.apiServicio.login(datos).subscribe({
      next: (res) => {
        this.authServicio
          .ObtenerPermisos({
            usuarioID: res.data?.usuarioId ?? 0,
          })
          .subscribe((res) => {
            // 1. Guardar los permisos en el servicio
            this.authServicio.setPermisos(this.authServicio.acceso());
            // 2. Construir rutas dinámicas
            const rutas = buildRoutes(this.authServicio.acceso()?.listaPagina ?? []);
            // 3. Inyectar las rutas en el Router
            this.router.resetConfig(rutas);
            // 4. Navegar a la página principal o dashboard
            this.router.navigate(['/prueba']);
          });
      },
      error: (err) => {
        this.isError.set(true);
        this.messageError.set(err.error.Message);
        // console.error('Error en login', err, err.error.Message);
      },
    });
    this.isLoading.set(false);
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
