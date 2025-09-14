import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/auth/request/login-request';
import { AuthApiService } from 'src/app/core/services/auth-api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-auth-page',
  templateUrl: './login-auth-page.component.html',
})
export default class LoginAuthPageComponent {
  constructor(private router: Router) {}
  apiServicio = inject(AuthApiService);
  authServicio = inject(AuthService);

  usuarioNombre = signal<string>('');
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
        this.authServicio.ObtenerPermisos({
          usuarioID: res.data?.usuarioId ?? 0,
        });

        // console.log('Login exitoso', res);
        this.router.navigate(['/prueba']);
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
      usuarioNombre: this.usuarioNombre(),
      password: this.password(),
    };
  }

  ocultarError() {
    this.isError.set(false);
  }
}
