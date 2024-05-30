import { useErrorStore } from "@/stores"; // Ajusta la ruta según tu estructura de carpetas

export const handleError = (error) => {
  const errorManager = useErrorStore();
  errorManager.handleError(error);
  throw error;
};
