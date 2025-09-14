import { MenuPaginaResponse } from './menuPagina-response';

export interface ObtenerAccesosResponse {
  usuarioID: number;
  nombreRol: string;
  nombreUsuario: string;
  listaPagina: MenuPaginaResponse[];
}
