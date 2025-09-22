import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './features/auth/pages/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAppInitializer(() => {
      const currentPath = window.location.pathname;
      // Si estamos en / o /login no cargamos permisos
      if (currentPath === '/' || currentPath.startsWith('/login')) {
        return Promise.resolve();
      }
      const authService = inject(AuthService);
      const claims = authService.datosUsuario();
      if (claims) {
        // Si devolverás un Observable, puedes usar firstValueFrom para convertirlo en Promise
        return firstValueFrom(
          authService.ObtenerPermisos({
            usuarioID: claims.usuarioID,
          })
        );
      }
      return Promise.resolve();
    }),
  ],
};
