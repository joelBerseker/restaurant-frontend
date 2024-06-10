import { Model } from "@/models/";

export class UserModel extends Model {
  id_role = {
    id: "id_role",
    name: "rol",
    type: "select",
    navigation: "rol",
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
    max: 12,
    min: 8,
    validation: {},
    validate: ["number"],
  };

  photo = {
    id: "photo",
    name: "foto de perfil",
    type: "image",
    value: null,
    file: null,
    required: false,
    validation: {},
  };

  dark_mode = {
    id: "dark_mode",
    name: "modo oscuro",
    value: false,
  };
  password = {
    id: "password",
    name: "Contraseña",
    value: null,

    min: 8,
    max: 20,

    validation: {},
    validate: ["length"],
    alsoValidate: ["confirm_password"],
  };
  confirm_password = {
    id: "confirm_password",
    name: "Confirmar Contraseña",
    value: null,

    equalsTo: this.password,

    validation: {},
    validate: ["equals"],
  };
  generate_password = {
    id: "generate_password",
    name: "Generar Contraseña",
    value: true,
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
  beforeValidate() {
    if (this.generate_password.value) {
      this.password.noValidate = true;
      this.confirm_password.noValidate = true;
    } else {
      this.password.noValidate = false;
      this.confirm_password.noValidate = false;
    }
  }
  beforeAddData() {
    if (this.generate_password.value) {
      this.password.value = this.first_name.value + this.last_name.value;
    }
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
