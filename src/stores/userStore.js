import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    User: "",
    token: "", // Obtener el token de la cookie si existe
    refresh: "",
    id: "",
    mayus: true,
    permises: {},
  }),
  getters: {
    isLoggedIn: (state) => state.token,
    isLoggedIn2: (state) => state.refresh,
    getId: (state) => state.id,
    getUser: (state) => state.User,
    isActive: (state) => state.token != "" || state.token == null,
    getPermises: (state) => state.permises,
    isActive2: (state) => state.est,
  },
  actions: {
    setPermises(p) {
      this.permises = p;
    },
    logout() {
      console.log("entre a realizar un logout");
      this.token = ""; // Limpiar el token

      this.$reset();
    },
    updateUser(new_user) {
      this.User = new_user;
    },
    updateToken(new_token, new_refresh) {
      this.token = new_token;
      this.refresh = new_refresh;
      // Guardar el token en la cookie
    },
    updateId(new_id) {
      this.id = new_id;
    },
    isAdmin() {
      return this.User.is_p;
    },
    isUser() {
      return this.User.is_user;
    },
    getRol() {
      return this.User.rol;
    },
    changePasswordPermises(id) {
      if (this.User.is_p) return true;
      if (id == this.id) return true;
      return false;
    },
    dataProfile() {
      return {
        name: this.User.name,
        email: this.User.email,
        rol: this.User.rol,
        photo: this.User.photo,
      };
    },
    getPermiseModule(moduleid) {
      // Verificar si this.permises es un array
      if (!Array.isArray(this.permises)) {
        console.error("this.permises no es un array válido.");
        return null;
      }
      const data = this.permises.find(
        (objeto) => objeto.module_id.value == moduleid
      );
      return data || null; // Devolver el objeto encontrado o null si no se encuentra
    },
  },
  persist: {
    paths: ["User", "id", "mayus", "permises", "token", "refresh"], //id: "",
  },
});
