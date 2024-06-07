import { Model } from "@/models/";

export class UserModel extends Model {
  id_role = {
    id: "id_role",
    name: "rol",
    type: "select",

    value: null,
    additional: {},
    validation: {},
    getValueText() {
      return this.additional.name;
    },
  };

  email = {
    id: "email",
    name: "correo electrónico",
    value: null,
    validation: {},
    validate: ["length", "email"],
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
  };

  dark_mode = {
    id: "dark_mode",
    name: "modo oscuro",
    value: false,
  };
  is_admin = {
    value: "",
  };
  company_id = {
    value: "",
    additional: {},
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
      text: `${this.first_name.value} ${this.last_name.value}`,
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
