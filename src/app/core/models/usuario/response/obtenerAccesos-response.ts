import { MenuPaginaResponse } from './menuPagina-response';

export interface ObtenerAccesosResponse {
  usuarioID: number;
  nombreRol: string;
  usuarioCuenta: string;
  usuarioNombre: string;
  listaPagina: MenuPaginaResponse[];
}
