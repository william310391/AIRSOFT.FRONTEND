import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { LoginRequest } from '@core/models/auth/request/login-request';
import { LoginResponse } from '@core/models/auth/response/login-response';
import { JwtHelper } from '@core/utils/JwtHelper';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  protected override urlService = 'api/Auth';

  login(loginRequest: LoginRequest) {
    return this.post<LoginResponse, LoginRequest>('login', loginRequest).pipe(
      map((data) => {
        // Agrega este log para verificar la respuesta
        if (!data) throw new Error('Login failed');

        JwtHelper.setToken(data.token);
        return data;
      }),
    );
  }
}
