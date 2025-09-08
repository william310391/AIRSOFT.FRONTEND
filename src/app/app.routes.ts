import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-auth-page/login-auth-page.component'),
  },

  {
    path: '',
    loadComponent: () => import('./core/layout/main-layout/main-layout.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'prueba',
        loadComponent: () => import('./features/prueba/pages/prueba-page/prueba-page.component'),
      },
    ],
  },
  {
    path: 'unauthorized/:codeError',
    loadComponent: () =>
      import('./features/error/pages/error-pages-code/error-pages-code.component'),
  },

  {
    path: '**',
    redirectTo: 'unauthorized/404',
  },
];
