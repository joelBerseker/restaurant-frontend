import { useToastStore, useErrorStore } from "@/stores"; // Ajusta la ruta según tu estructura de carpetas
import { formatearErrores } from "@/helpers/utilities"; // Ajusta la ruta según tu estructura de archivos

export const handleError = (error, action, module) => {
  const useToast = useToastStore();
  const errorManager = useErrorStore();

  if (error.response && error.response.status === 400) {
    const value = error.response.data;
    const mensaje = formatearErrores(value);
    useToast.show(action, {
      important_text: module,
      list_error: mensaje,
    });
  } else {
    console.error("An unexpected error occurred:", error);
    useToast.show(action, {
      important_text: module,
      error: error,
    });
  }

  errorManager.handleError(error);
  //throw error;
};
