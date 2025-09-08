export interface HttpStatus {
  code: number;
  title: string;
  description: string;
}

export const HTTP_STATUS_CODES: Record<string, HttpStatus> = {
  '200': {
    code: 200,
    title: 'OK',
    description: 'Solicitud exitosa.',
  },
  '201': {
    code: 201,
    title: 'Created',
    description: 'Recurso creado correctamente.',
  },
  '400': {
    code: 400,
    title: 'Bad Request',
    description: 'La solicitud es incorrecta o está mal formada.',
  },
  '401': {
    code: 401,
    title: 'Unauthorized',
    description: 'Requiere autenticación.',
  },
  '403': {
    code: 403,
    title: 'Forbidden',
    description: 'El acceso al recurso está prohibido.',
  },
  '404': {
    code: 404,
    title: 'Not Found',
    description: 'El recurso solicitado no existe.',
  },
  '500': {
    code: 500,
    title: 'Internal Server Error',
    description: 'Error interno en el servidor.',
  },
  '503': {
    code: 503,
    title: 'Service Unavailable',
    description: 'El servicio no está disponible.',
  },
  // 👉 puedes seguir extendiendo la lista...
};

// export const HTTP_STATUS_CODES: Record<string, string> = {
//   // '100': 'Continue - El cliente debe continuar con la solicitud.',
//   // '101': 'Switching Protocols - El servidor acepta el cambio de protocolo.',
//   // '102': 'Processing - El servidor está procesando la solicitud (WebDAV).',
//   // '200': 'OK - Solicitud exitosa.',
//   // '201': 'Created - Recurso creado correctamente.',
//   // '202': 'Accepted - Solicitud aceptada pero aún en proceso.',
//   // '204': 'No Content - Solicitud exitosa pero sin contenido de respuesta.',
//   // '301': 'Moved Permanently - El recurso se ha movido de forma permanente.',
//   '302': 'Found - El recurso se encuentra temporalmente en otra ubicación.',
//   '304': 'Not Modified - El recurso no ha cambiado desde la última petición.',
//   '400': 'Bad Request - La solicitud es incorrecta o está mal formada.',
//   '401': 'Unauthorized - Requiere autenticación.',
//   '403': 'Forbidden - El acceso al recurso está prohibido.',
//   '404': 'Not Found - El recurso solicitado no existe.',
//   '405': 'Method Not Allowed - Método HTTP no permitido para el recurso.',
//   '409': 'Conflict - Conflicto con el estado actual del recurso.',
//   '422': 'Unprocessable Entity - La solicitud está bien formada, pero no se puede procesar.',
//   '500': 'Internal Server Error - Error interno en el servidor.',
//   '501': 'Not Implemented - El servidor no reconoce el método solicitado.',
//   '502': 'Bad Gateway - El servidor recibió una respuesta inválida de otro servidor.',
//   '503': 'Service Unavailable - El servicio no está disponible.',
//   '504': 'Gateway Timeout - El servidor no recibió respuesta a tiempo.',
// };
