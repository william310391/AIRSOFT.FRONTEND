import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-auth-page/login-auth-page.component'),
  },

  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'prueba',
        loadComponent: () => import('./features/prueba/pages/prueba-page/prueba-page.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
