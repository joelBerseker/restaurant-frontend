import { authApiRestService } from "@/services/authService/authApiRestService";
import { authJsonService } from "@/services/authService/authJsonService";
const mode = import.meta.env.VITE_APP_MODE;
export const authService = {
  //metodo para obtener token de un usuario enviando sus credenciales (correo,contraseña)
  async obtain_token(credentials) {
    switch (mode) {
      case "production":
        return await authApiRestService.obtain_token(credentials);
      case "test":
        return await authJsonService.obtain_token(credentials);
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  //metodo para extender el tiempo de vida de un token
  async refresh_token() {
    switch (mode) {
      case "production":
        return await authApiRestService.refresh_token();
      case "test":
        return await authJsonService.refresh_token();
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },

  //metodo para obtener todos los datos del usuario logueado
  async getUser() {
    switch (mode) {
      case "production":
        return await authApiRestService.getUser();
      case "test":
        return await authJsonService.getUser();
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async setUser() {
    switch (mode) {
      case "production":
        return await authApiRestService.setUser();
      case "test":
        return await authJsonService.setUser();
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async logoutUser() {
    switch (mode) {
      case "production":
        return await authApiRestService.logoutUser();
      case "test":
        return await authJsonService.logoutUser();
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
  async setPermisos() {
    switch (mode) {
      case "production":
        return await authApiRestService.setPermisos();
      case "test":
        return await authJsonService.setPermisos();
      default:
        throw new Error(`Mode "${mode}" no está soportado`);
    }
  },
};
