import { MenuPaginaResponse } from './menuPagina-response';

export interface ObtenerAccesosResponse {
  nombreRol: string;
  nombreUsuario: string;
  listaPagina: MenuPaginaResponse[];
}
