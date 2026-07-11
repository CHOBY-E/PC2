import axios from "axios";

interface ApiErrorBody {
  message?: string;
  error?: string;
}

/**
 * Traduce cualquier error (de red o de la API) a un mensaje
 * legible para mostrar al usuario en la interfaz.
 */
export function getErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err)) {
    return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }

  if (err.code === "ECONNABORTED") {
    return "La solicitud tardó demasiado (timeout). Verifica tu conexión.";
  }

  if (!err.response) {
    return "No se pudo conectar con el servidor. Intenta más tarde.";
  }

  const data = err.response.data as ApiErrorBody | undefined;
  const backendMessage = data?.message ?? data?.error;

  switch (err.response.status) {
    case 400:
      return backendMessage ?? "Los datos ingresados no son válidos.";
    case 401:
      return "Tu sesión expiró o no es válida. Inicia sesión nuevamente.";
    case 404:
      return backendMessage ?? "El recurso solicitado no existe.";
    case 409:
      return backendMessage ?? "Ya existe un registro con esos datos (email o username duplicado).";
    case 500:
      return "Error interno del servidor. Intenta más tarde.";
    default:
      return backendMessage ?? "Ocurrió un error al procesar la solicitud.";
  }
}
