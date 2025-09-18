import { Router, type CanActivateFn } from '@angular/router';
import { JwtHelper } from '../utils/JwtHelper';
import { inject, signal } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = JwtHelper.getToken();
  const excludedRoutes = ['/login'];

  if (excludedRoutes.includes(state.url)) {
    return true;
  }

  // if (state.url === '/' || state.url === '') {
  //   if (token && !JwtHelper.isTokenExpired(token)) {
  //     router.navigate(['/prueba']);
  //   } else {
  //     router.navigate(['/login']);
  //   }
  //   return false;
  // }

  if (!token || JwtHelper.isTokenExpired(token)) {
    //|| JwtHelper.isTokenExpired(token)
    router.navigate(['/login']);
    return false;
  }

  return true;
};
