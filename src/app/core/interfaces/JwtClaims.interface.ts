export interface JwtClaims {
  usuarioNombre: string;
  usuarioCuenta: string;
  usuarioID: number;
  usuarioRol: string;
  usuarioUrlImagen: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface MenuPaginaResponse {
  MenuNombre: string;
  MenuIcono: string;
  MenuUrlLink: string;
  PaginaNombre: string;
  PaginaIcono: string;
  PaginaUrlLink: string;
}
