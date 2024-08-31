import { useUserStore } from "@/stores";
import axiosJsonInstance from "../axios-json-instance";
import { permisesService } from "@/services";
import { userJsonService } from "@/services/user/userJsonService";
import { handleError } from "@/helpers";
//import { rolService } from "./user";

export const authJsonService = {
  //metodo para obtener token de un usuario enviando sus credenciales (correo,contraseña)
  async obtain_token(credentials) {
    try {
      console.log("enviando consulta");
      const response = await userJsonService.userVerify(credentials);
      const userStore = useUserStore();
      userStore.updateToken(response.access, response.refresh);
      userStore.updateId(response.user_id);
      await this.setUser();
      //await this.setPermisos();
      return true;
    } catch (error) {
      handleError(error, "login_error");
      throw error;
    }
  },
  //metodo para extender el tiempo de vida de un token
  async refresh_token() {
    return true;
  },
  //metodo para obtener todos los datos del usuario logueado
  async getUser() {
    const userStore = useUserStore();
    return userStore.getUser();
  },
  async setUser() {
    const userStore = useUserStore();
    const userid = userStore.getId;
    const user = await userJsonService.getUser(userid);
    console.log(1);

    userStore.updateUser(user.saveUser());
  },
  async logoutUser() {
    const user = useUserStore();
    user.logout();
    console.log("Fin de sesison");
  },
  async setPermisos() {
    const userStore = useUserStore();
    let rol = userStore.getRol();
    if (!userStore.isUser()) {
      this.logoutUser();
      throw Error("No tiene permiso de ingreso");
    }
    //let data = await permisesService.getListPermises({ role_id: rol });
    userStore.setPermises([
      {
        id: 1,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "1",
        role_id: 1,
      },
      {
        id: 2,
        create: true,
        read: false,
        update: false,
        delete: true,
        print: true,
        export: false,
        active: false,
        notify: false,
        module_id: "2",
        role_id: 1,
      },
      {
        id: 3,
        create: true,
        read: false,
        update: true,
        delete: true,
        print: true,
        export: false,
        active: true,
        notify: false,
        module_id: "3",
        role_id: 1,
      },
      {
        id: 4,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "4",
        role_id: 1,
      },
      {
        id: 5,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "5",
        role_id: 1,
      },
      {
        id: 6,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "6",
        role_id: 1,
      },
      {
        id: 7,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "7",
        role_id: 1,
      },
      {
        id: 8,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "8",
        role_id: 1,
      },
      {
        id: 9,
        create: true,
        read: false,
        update: false,
        delete: false,
        print: false,
        export: false,
        active: false,
        notify: false,
        module_id: "9",
        role_id: 1,
      },
    ]);
  },
};
