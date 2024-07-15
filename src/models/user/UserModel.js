import { Model } from "@/models/";

export class UserModel extends Model {
  id_role = {
    id: "id_role",
    name: "Rol",
    type: "select",
    navigation: "rol",
    value: null,
    additionalKey: "name",

    additional: {},
    validation: {},
    getValueText() {
      if (!this.additional) return;

      return this.additional.name;
    },
  };

  email = {
    id: "email",
    name: "Correo Electrónico",
    value: null,
    validation: {},
    validate: ["length", "email"],
  };

  first_name = {
    id: "first_name",
    name: "Nombres",
    value: null,
    validation: {},
    validate: ["length"],
  };

  last_name = {
    id: "last_name",
    name: "Apellidos",
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
    validate: ["length", "number"],
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
    name: "Modo oscuro",
    value: false,
  };
  password = {
    id: "password",
    name: "Contraseña",
    type: "password",
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
    type: "password",

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
  full_name = {
    value: "",
  };
  saveUser() {
    return {
      id: this.id.value,
      email: this.email.value,
      name: this.first_name.value + " " + this.last_name.value,
      photo: this.photo.value,
      rol: this.id_role.value,
      rol_name: this.id_role.getValueText(),
      is_p: this.is_admin.value,
      company: this.company_id.additional,
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
    if (this.id.value) {
      this.password.omit = true;
    }
    if (this.generate_password.value) {
      this.password.value = this.first_name.value + this.last_name.value;
    }
    this.full_name.value = this.first_name.value + " " + this.last_name.value;
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
      "Usuario [" +
      this.id.value +
      " - " +
      this.first_name.value +
      " " +
      this.last_name.value +
      "]"
    );
  }
  getDataTable() {
    return [
      {
        label: "ID",
        field: "id",
        sortable: true,
        width: "1%",
      },
      {
        label: this.first_name.name,
        field: this.first_name.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.last_name.name,
        field: this.last_name.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.email.name,
        field: this.email.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.id_role.name,
        field: this.id_role.id + "__" + this.id_role.additionalKey,
        sortable: true,
        searchable: true,
      },
    ];
  }
}
