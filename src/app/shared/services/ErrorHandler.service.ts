import { inject, Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { BackendError, FrontendValidationError } from '../interfaces/error';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  alertService = inject(AlertService);

  handle(error: any): void {
    if (error instanceof FrontendValidationError) {
      console.log('error frontend', error);
      this.handleFrontendError(error);
    } else if (error instanceof BackendError) {
      console.log('error BackendError', error);
      this.handleBackendError(error);
    } else {
      console.log('error otro', error);
      this.handleUnknownError(error);
    }
  }

  //ejecuta con validacion
  executeWithValidation<T, R>(
    data: T,
    validateFn: (data: T) => void,
    sanitizeFn: (data: T) => R,
    apiCall: (sanitized: R) => Observable<any>
  ): Observable<any> {
    try {
      // Validación
      validateFn(data);

      // Sanitizar
      const sanitizedData = sanitizeFn(data);

      // Llamar al backend con manejo de errores
      return apiCall(sanitizedData).pipe(
        catchError((httpError) => this.handleHttpError(httpError))
      );
    } catch (error) {
      return this.handleValidationError(error);
    }
  }
  //ejecuta sin validacion
  execute<T>(apiCall: () => Observable<T>): Observable<T> {
    return apiCall().pipe(catchError((httpError) => this.handleHttpError(httpError)));
  }

  handleHttpError(httpError: any): Observable<never> {
    const backendError = new BackendError(
      httpError.error?.Message || 'Error del servidor',
      httpError.status,
      httpError.error?.Message
    );

    console.log('Backend Error:', backendError);
    this.handle(backendError);

    return throwError(() => backendError);
  }

  handleValidationError(error: any): Observable<never> {
    const frontendError =
      error instanceof FrontendValidationError
        ? error
        : new FrontendValidationError(
            error instanceof Error ? error.message : 'Error de validación'
          );

    this.handle(frontendError);
    return throwError(() => frontendError);
  }

  private handleFrontendError(error: FrontendValidationError): void {
    console.log('Error de validación frontend:', error.message);
    this.alertService.alert({
      icon: 'error',
      title: 'Validación',
      text: error.message,
    });
  }

  private handleBackendError(error: BackendError): void {
    //console.log('Error del backend:', error.message, 'Status:', error.statusCode, error);

    const errorMessages: Record<number, { title: string; text: string }> = {
      400: {
        title: 'Datos inválidos',
        text: error.serverMessage || error.message,
      },
      401: {
        title: 'No autorizado',
        text: error.serverMessage || 'Debes iniciar sesión nuevamente',
      },
      403: {
        title: 'Prohibido',
        text: error.serverMessage || 'No tienes permisos para esta acción',
      },
      404: {
        title: 'No encontrado',
        text: error.serverMessage || 'El recurso no existe',
      },
      409: {
        title: 'Conflicto',
        text: error.serverMessage || 'El usuario ya existe',
      },
      422: {
        title: 'Error de validación',
        text: error.serverMessage || error.message,
      },
      500: {
        title: 'Error del servidor',
        text: 'Intente nuevamente más tarde',
      },
      503: {
        title: 'Servicio no disponible',
        text: 'El servidor está en mantenimiento',
      },
    };

    const errorConfig = errorMessages[error.statusCode || 0] || {
      title: 'Error',
      text: error.message,
    };

    this.alertService.alert({
      icon: 'error',
      title: errorConfig.title,
      text: errorConfig.text,
    });
  }

  private handleUnknownError(error: any): void {
    console.error('Error desconocido:', error);
    this.alertService.alert({
      icon: 'error',
      title: 'Error inesperado',
      text: 'Ocurrió un error inesperado',
    });
  }
}
