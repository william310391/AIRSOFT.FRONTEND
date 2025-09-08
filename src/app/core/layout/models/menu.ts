import { Pagina } from './pagina';

export interface Menu {
  menuNombre: string;
  menuIcono: string;
  menuUrlLink: string;
  paginas: Pagina[];
}
