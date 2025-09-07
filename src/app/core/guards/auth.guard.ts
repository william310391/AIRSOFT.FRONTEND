import { Router, type CanActivateFn } from '@angular/router';
import { JwtHelper } from '../utils/JwtHelper';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = JwtHelper.getToken();

  const excludedRoutes = ['/login'];

  if (excludedRoutes.includes(state.url)) {
    return true;
  }

  if (!token || JwtHelper.isTokenExpired(token)) {
    //|| JwtHelper.isTokenExpired(token)
    router.navigate(['/login']);
    return false;
  }

  return true;
};
