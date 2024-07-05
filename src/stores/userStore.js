import { defineStore } from "pinia";
import { AES, enc } from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY_USER_STORE;

export const useUserStore = defineStore("user", {
  state: () => ({
    User: "",
    token: "",
    refresh: "",
    id: "",
    mayus: true,
    permises: {},
    modulePermises: {},
  }),
  getters: {
    isLoggedIn: (state) => {
      return state.token ? decrypt(state.token) : "";
    },
    isLoggedIn2: (state) => {
      return state.refresh ? decrypt(state.refresh) : "";
    },
    getId: (state) => {
      return state.id;
    },
    getUser: (state) => {
      return state.User ? decrypt(state.User) : "";
    },
    isActive: (state) => {
      return state.token !== "" || state.token === null;
    },
    getPermises: (state) => {
      return state.permises ? decrypt(state.permises) : {};
    },
    isActive2: (state) => {
      return state.est;
    },
    getModulePermise: (state) => {
      return state.modulePermises ? decrypt(state.modulePermises) : {};
    },
  },
  actions: {
    setPermises(p) {
      this.permises = encrypt(p);
      this.encryptAndSave();
    },
    setModulePermises(p) {
      this.modulePermises = encrypt(p);
      this.encryptAndSave();
    },

    updateUser(new_user) {
      this.User = encrypt(new_user);
      this.encryptAndSave();
    },

    updateToken(new_token, new_refresh) {
      this.token = encrypt(new_token);
      this.refresh = encrypt(new_refresh);
      this.encryptAndSave();
    },

    updateId(new_id) {
      this.id = new_id;
      this.encryptAndSave();
    },

    logout() {
      this.clearSensitiveData();
      this.$reset();
    },

    isAdmin() {
      const decryptedUser = decrypt(this.User);
      return decryptedUser.is_p;
    },

    isUser() {
      return true;
    },

    getRol() {
      const decryptedUser = decrypt(this.User);
      return decryptedUser.rol;
    },

    getCompany() {
      const decryptedUser = decrypt(this.User);
      return decryptedUser.company;
    },

    changePasswordPermises(id) {
      const decryptedUser = decrypt(this.User);
      if (decryptedUser.is_p) return true;
      if (id == this.id) return true;
      return false;
    },

    dataProfile() {
      if (!this.User) return {};

      const decryptedUser = decrypt(this.User);

      return {
        name: decryptedUser.name || "",
        email: decryptedUser.email || "",
        rol: decryptedUser.rol || "",
        photo: decryptedUser.photo || null,
        rol_name: decryptedUser.rol_name || "sin rol",
      };
    },
    getToSelect() {
      if (!this.User) return {};
      const decryptedUser = decrypt(this.User);

      return {
        value: decryptedUser.id || "",
        valueText: decryptedUser.name || "",
      };
    },
    getPermiseAction(moduleid, action = 2) {
      if (moduleid === 0) return true;
      if (!moduleid) return true;

      const decryptedUser = decrypt(this.User);
      const is_admin = decryptedUser.is_p;

      if (is_admin) return true;

      const decryptedPermises = decrypt(this.permises);
      if (!Array.isArray(decryptedPermises)) {
        console.error("this.permises no es un array válido.");
        return null;
      }

      const data = decryptedPermises.find(
        (objeto) => objeto.module_id == moduleid
      );
      this.modulePermises = data;

      let permise = false;
      switch (action) {
        case 1:
          permise = data.create;
          break;
        case 2:
          permise = data.read;
          break;
        case 3:
          permise = data.update;
          break;
        default:
          permise = data.read;
          break;
      }
      return permise;
    },

    encryptAndSave() {
      const dataToEncrypt = {
        User: this.User,
        token: this.token,
        refresh: this.refresh,
        id: this.id,
        mayus: this.mayus,
        permises: this.permises,
        module: this.modulePermises,
      };

      const encryptedData = AES.encrypt(
        JSON.stringify(dataToEncrypt),
        SECRET_KEY
      ).toString();
      localStorage.setItem("userData", encryptedData);
    },

    loadAndDecrypt() {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const bytes = AES.decrypt(storedData, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(enc.Utf8));

        this.User = decryptedData.User;
        this.token = decryptedData.token;
        this.refresh = decryptedData.refresh;
        this.id = decryptedData.id;
        this.mayus = decryptedData.mayus;
        this.permises = decryptedData.permises;
        this.modulePermises = decryptedData.modulePermises;
      }
    },

    clearSensitiveData() {
      this.User = "";
      this.token = "";
      this.refresh = "";
      this.id = "";
      this.mayus = true;
      this.permises = {};
      this.modulePermises = {};

      localStorage.removeItem("userData");
    },
  },
  persist: {
    paths: [
      "User",
      "id",
      "mayus",
      "permises",
      "token",
      "refresh",
      "modulePermises",
    ],
  },
});

// Función para encriptar datos
function encrypt(data) {
  return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

// Función para desencriptar datos
function decrypt(data) {
  const bytes = AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(enc.Utf8));
}
