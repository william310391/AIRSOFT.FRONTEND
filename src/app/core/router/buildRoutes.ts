import { Routes } from '@angular/router';

import { MenuPaginaResponse } from '../models/usuario/response/menuPagina-response';
import { authGuard } from '../guards/auth.guard';
import { signal } from '@angular/core';
import { ObtenerAccesosResponse } from '../models/usuario/response/obtenerAccesos-response';
import { permisosGuard } from '../guards/permisos.guard';

export const COMPONENT_IMPORTS: Record<string, () => Promise<any>> = {
  '/administracion/usuarios': () =>
    import(
      '../../features/administracion/pages/administracion-pages-usuarios/administracion-pages-usuarios.component'
    ),
  '/reporte/usuarios_registrados': () =>
    import(
      '../../features/reportes/pages/reportes-pages-usuarios-registrados/reportes-pages-usuarios-registrados.component'
    ),
  '/prueba': () => import('../../features/prueba/pages/prueba-page/prueba-page.component'),
};

export function buildRoutes(menuPaginaResponse: MenuPaginaResponse[]): Routes {
  let acceso = signal<ObtenerAccesosResponse | null>(null);
  // console.log('llegoaaa', acceso()?.listaPagina, menuPaginaResponse);
  return [
    {
      path: 'login',
      loadComponent: () =>
        import('../../features/auth/pages/login-auth-page/login-auth-page.component'),
    },
    {
      path: '',
      loadComponent: () =>
        import('../../features/auth/pages/login-auth-page/login-auth-page.component'),
    },
    {
      path: '',
      loadComponent: () => import('../../core/layout/main-layout/main-layout.component'),
      canActivate: [authGuard],
      children: [
        {
          path: 'prueba',
          loadComponent: () =>
            import('../../features/prueba/pages/prueba-page/prueba-page.component'),
          canActivate: [permisosGuard],
        },

        ...menuPaginaResponse.map((pagina) => ({
          path: pagina.paginaUrlLink.replace(/^\//, ''),
          loadComponent: COMPONENT_IMPORTS[pagina.paginaUrlLink],
          canActivate: [permisosGuard],
        })),
      ],
    },

    {
      path: 'error/:codeError',
      loadComponent: () =>
        import('../../features/error/pages/error-pages-code/error-pages-code.component'),
    },
    {
      path: '**',
      redirectTo: 'error/401',
    },
  ];
}
