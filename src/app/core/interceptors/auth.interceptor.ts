import type { HttpInterceptorFn } from '@angular/common/http';
import { JwtHelper } from '../utils/JwtHelper';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = JwtHelper.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
