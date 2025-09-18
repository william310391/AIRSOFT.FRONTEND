import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/features/auth/pages/services/auth.service';
import { JwtHelper } from '../utils/JwtHelper';

export const permisosGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServicio = inject(AuthService);
  const ruta = route.routeConfig?.path ?? '';
  const excludedRoutes = ['/login'];

  if (excludedRoutes.includes(state.url)) {
    return true;
  }
  if (!authServicio.puedeAcceder(ruta)) {
    router.navigate(['/error/401']);
    return false;
  }

  return true;
};
