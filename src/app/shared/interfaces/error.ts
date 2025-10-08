export class FrontendValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FrontendValidationError';
  }
}

export class BackendError extends Error {
  constructor(message: string, public statusCode?: number, public serverMessage?: string) {
    super(message);
    this.name = 'BackendError';
  }
}
