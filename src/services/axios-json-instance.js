// auto-barrel-ignore

import axios from "axios";
import { authService } from "./authService";
import { useUserStore } from "@/stores/userStore";

axios.defaults.baseURL = import.meta.env.VITE_APP_RUTA_JSON;

const axiosJsonInstance = axios.create();

axiosJsonInstance.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.isActive) {
    let authToken = userStore.isLoggedIn;
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
let isRefreshing = false; // Bandera para evitar múltiples intentos de renovación del token
let subscribers = [];

axiosJsonInstance.interceptors.response.use(
  (response) => {
    // Maneja las respuestas exitosas
    return response;
  },
  async (error) => {
    console.log("estoy acax3");
    //console.log(error);
    console.log("estoy acax4");
    const userStore = useUserStore();

    if (error.response && error.response.status === 401) {
      console.log("La respuesta es un 401 (No autorizado)");
      const { accessToken, refreshToken } = userStore; // Obtiene el token actual y el token de refresco

      if (!isRefreshing) {
        isRefreshing = true;
        console.log("Iniciando renovación del token...");

        // Verifica si el error contiene un detalle específico que indica la falta de credenciales válidas
        if (
          error.response.data.detail ===
          "La combinación de credenciales no tiene una cuenta activa"
        ) {
          isRefreshing = false;
          // En este caso, no intentamos renovar el token y manejamos el error según tu lógica
          // Por ejemplo, mostrar un mensaje de error al usuario
          console.log(
            "No se intentará renovar el token debido a credenciales inválidas."
          );
          throw error;
        } else {
          // Llama a AuthService.refresh_token() para renovar el token
          try {
            await authService.refresh_token();
            isRefreshing = false;
            console.log("Renovación del token completada con éxito.");

            // Actualiza el token en la solicitud original y en las futuras solicitudes
            subscribers.forEach((callback) => callback(accessToken));

            // Borra la lista de suscriptores
            subscribers = [];
          } catch (refreshError) {
            isRefreshing = false;
            console.log("Error al renovar el token:");
            console.error(refreshError.response.status); // Imprime detalles del error

            if (refreshError.response && refreshError.response.status === 401) {
              // El token de refresco también es inválido o ha expirado
              console.log(
                "El token de refresco también es inválido o ha expirado."
              );
            } else {
              // Otro tipo de error durante la renovación del token
              // Maneja el error según tu lógica específica
              console.log(
                "QUISO RENOVAR PERO NO HAY UNA SESION O NO EXISTEN DATOS"
              );
            }

            throw refreshError; // Lanza el error para que sea manejado por el código que llamó al interceptor
          }
        }
      } else {
        console.log("paso por aqui");
        userStore.logout();
        location.reload();
        return;
      }

      console.log("Reintentando solicitud original con el nuevo token...");

      // Devuelve una promesa pendiente para la solicitud original
      return new Promise((resolve) => {
        subscribers.push((newAccessToken) => {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axiosJsonInstance(error.config));
        });
      });
    }

    // Maneja otros tipos de errores si es necesario
    return Promise.reject(error);
  }
);
export default axiosJsonInstance;
