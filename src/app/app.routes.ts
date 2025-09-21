import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-auth-page/login-auth-page.component'),
  },
  {
    path: '',
    loadComponent: () => import('./features/auth/pages/login-auth-page/login-auth-page.component'),
  },

  // {
  //   path: '',
  //   loadComponent: () => import('./core/layout/main-layout/main-layout.component'),
  //   canActivate: [authGuard],
  //   children: [
  //     {
  //       path: 'prueba',
  //       loadComponent: () => import('./features/prueba/pages/prueba-page/prueba-page.component'),
  //     },
  //     {
  //       path: 'administracion/usuarios',
  //       loadComponent: () =>
  //         import(
  //           './features/administracion/pages/administracion-pages-usuarios/administracion-pages-usuarios.component'
  //         ),
  //     },
  //     {
  //       path: 'reporte/usuarios_registrados',
  //       loadComponent: () =>
  //         import(
  //           './features/reportes/pages/reportes-pages-usuarios-registrados/reportes-pages-usuarios-registrados.component'
  //         ),
  //     },
  //   ],
  // },
  {
    path: 'error/:codeError',
    loadComponent: () =>
      import('./features/error/pages/error-pages-code/error-pages-code.component'),
  },

  {
    path: '**',
    redirectTo: 'error/401',
  },
];
