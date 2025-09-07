import { JwtClaims } from '../interfaces/JwtClaims.interface';

export class JwtHelper {
  private static tokenKey = 'access_token';

  // ✅ Guardar token en localStorage
  static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // ✅ Obtener token
  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ Eliminar token
  static removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // ✅ Decodificar payload del JWT (Base64)
  static decodeToken(token?: string): any | null {
    const jwt = token ?? this.getToken();
    if (!jwt) return null;

    try {
      const payload = jwt.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar token', error);
      return null;
    }
  }

  // ✅ Verificar expiración
  static isTokenExpired(token?: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const expiryDate = decoded.exp * 1000; // exp viene en segundos
    return Date.now() > expiryDate;
  }

  // ✅ Obtener claim específico (ej: "role", "sub", "email")
  static getClaim(claim: string): string | null {
    const token: string | null = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded ? decoded[claim] ?? null : null;
  }
  // ✅ Obtener all claims
  // static getClaimsAll(): JwtClaims | null {
  //   const token: string | null = this.getToken();
  //   if (!token) return null;
  //   const decoded = this.decodeToken(token);
  //   return decoded as JwtClaims;
  // }

  static getClaimsAll(): JwtClaims | null {
    const token: string | null = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    // 👇 si listaMenu existe y es un string JSON → lo convertimos en array tipado
    if (decoded.listaMenu && typeof decoded.listaMenu === 'string') {
      try {
        decoded.listaMenu = JSON.parse(decoded.listaMenu);
      } catch (e) {
        console.error('Error parseando listaMenu:', e);
        decoded.listaMenu = [];
      }
    }
    return decoded as JwtClaims;
  }
}
