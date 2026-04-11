import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ApiResponse } from '../models/api-response';
import { map, catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService {
  protected http = inject(HttpClient);
  protected abstract urlService: string;

  private buildUrl(endpoint: string): string {
    return `${environment.ApiUrlBase}/${this.urlService}/${endpoint}`;
  }

  protected handleError<T>() {
    return (error: unknown) => {
      let message = 'Error inesperado';

      if (error instanceof HttpErrorResponse) {
        message = error.error?.message || error.error?.Message || `Error ${error.status}`;
      }

      console.error('API error:', message);

      return throwError(() => new Error(message));
    };
  }

  protected get<TResponse>(endpoint: string, params?: any): Observable<TResponse | null> {
    return this.http.get<ApiResponse<TResponse>>(this.buildUrl(endpoint), { params }).pipe(
      map((res) => (res.success ? res.data : null)),
      catchError(this.handleError<TResponse>()),
    );
  }

  protected post<TResponse, TRequest>(
    endpoint: string,
    body: TRequest,
  ): Observable<TResponse | null> {
    return this.http.post<ApiResponse<TResponse>>(this.buildUrl(endpoint), body).pipe(
      map((res) => (res.success ? res.data : null)),
      catchError(this.handleError<TResponse>()),
    );
  }

  protected put<TResponse, TRequest>(
    endpoint: string,
    body: TRequest,
  ): Observable<TResponse | null> {
    return this.http.put<ApiResponse<TResponse>>(this.buildUrl(endpoint), body).pipe(
      map((res) => (res.success ? res.data : null)),
      catchError(this.handleError<TResponse>()),
    );
  }

  protected delete<T>(endpoint: string): Observable<T | null> {
    return this.http.delete<ApiResponse<T>>(this.buildUrl(endpoint)).pipe(
      map((res) => (res.success ? res.data : null)),
      catchError(this.handleError<T>()),
    );
  }
}
