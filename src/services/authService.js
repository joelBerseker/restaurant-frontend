import { useUserStore } from "@/stores";
import axiosInstance from "./axios-instance";
import { userService } from "@/services";
import { handleError } from "@/helpers";
import router from "@/router";
//import { rolService } from "./user";

export const authService = {
  //metodo para obtener token de un usuario enviando sus credenciales (correo,contraseña)
  async obtain_token(credentials) {
    try {
      console.log("enviando consulta");
      const response = await axiosInstance.post("user/token/", credentials);
      const userStore = useUserStore();
      console.log("respuesta recivida");
      userStore.updateToken(response.data.access, response.data.refresh);
      userStore.updateId(response.data.user_id);
      await this.setUser();
      await this.setPermisos();
    } catch (error) {
      handleError(error, "get_element_error", "Login");
    }
  },
  //metodo para extender el tiempo de vida de un token
  async refresh_token() {
    const userStore = useUserStore();
    try {
      const response = await axiosInstance.post("user/refresh-token/", {
        refresh: userStore.isLoggedIn,
      });
      userStore.updateToken(response.data.access, response.data.refresh);
      this.getUser();
    } catch (error) {
      //console.log(error.response);
      if (error.response && error.response.status === 401) {
        userStore.logout();
        location.reload(); //
      } else {
        userStore.logout();
        //location.reload(); //
        handleError(
          Error("Ocurrió un error al obtener el token"),
          "get_element_error",
          "Login"
        );
      }
    }
  },

  //metodo para obtener todos los datos del usuario logueado
  async getUser() {
    const userStore = useUserStore();
    return userStore.getUser();
  },
  async setUser() {
    const userStore = useUserStore();
    const userid = userStore.getId;
    const user = await userService.getUser(userid);
    userStore.updateUser(user.saveUser());
  },
  async logoutUser() {
    const user = useUserStore();
    await user.logout();
  },
  async setPermisos() {
    const userStore = useUserStore();
    //let rol = userStore.getRole();
    //console.log(rol);
    if (!userStore.isUser()) {
      this.logoutUser();
      throw Error("No tiene permiso de ingreso");
    }
    let data = [true, true, true];
    const add = userStore.setPermises(data);
    console.log(data);
  },
};
