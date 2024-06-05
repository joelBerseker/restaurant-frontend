import { Model } from "@/models/";

export class UserModel extends Model {
  id_role = {
    id: "id_role",
    name: "rol",
    value: null,
    additional: {},
    validation: {},
    validate: ["select"],
  };

  email = {
    id: "email",
    name: "correo electrónico",
    value: null,
    validation: {},
    validate: ["length"],
  };

  first_name = {
    id: "first_name",
    name: "nombres",
    value: null,
    validation: {},
    validate: ["length"],
  };

  last_name = {
    id: "last_name",
    name: "apellidos",
    value: null,
    validation: {},
    validate: ["length"],
  };

  ruc = {
    id: "ruc",
    name: "RUC",
    value: null,
    validation: {},
    validate: ["length"],
  };

  photo = {
    id: "photo",
    name: "foto de perfil",
    value: null,
    validation: {},
    validate: ["file"],
  };

  dark_mode = {
    id: "dark_mode",
    name: "dark mode",
    value: false,
    validation: {},
    validate: [],
  };
  is_admin = {
    value: "",
  };
  saveUser() {
    return {
      id: this.id.value,
      email: this.email.value.toLowerCase(),
      name: this.first_name.value + " " + this.last_name.value,
      photo: this.photo.value,
      rol: this.id_role.value,
      is_p: this.is_admin.value,
    };
  }
  getDataOptions() {
    return {
      value: this.id.value,
      text: this.first_name.value,
    };
  }
  getText() {
    return (
      this.id.value + " - " + this.first_name.value + " " + this.last_name.value
    );
  }
  getTextModel() {
    return (
      "Usuario " +
      this.id.value +
      " - " +
      this.first_name.value +
      " " +
      this.last_name.value
    );
  }
}
