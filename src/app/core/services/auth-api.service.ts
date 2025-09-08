import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { tap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { LoginRequest } from 'src/app/core/models/auth/request/login-request';
import { LoginResponse } from 'src/app/core/models/auth/response/login-response';
import { JwtHelper } from 'src/app/core/utils/JwtHelper';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor() {}
  http = inject(HttpClient);
  urlServicio = `${environment.ApiUrlBase}/api/Auth`;

  login(loginRequest: LoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.urlServicio}/login`, loginRequest)
      .pipe(
        tap((res) => {
          if (res.success && res.data?.token) {
            JwtHelper.setToken(res.data.token);
            // console.log(JwtHelper.getClaimsAll());
          }
        })
      );
  }
}
