import { Model } from "@/models/";

export class UserPasswordModel extends Model {
  id_user = {
    value: null,
  };
  password = {
    id: "password",
    name: "Antigua Contraseña",
    value: null,
    type: "password",

    min: 4,
    max: 20,

    validation: {},
    validate: ["length"],
  };
  new_password = {
    id: "new_password",
    name: "Nueva Contraseña",
    value: null,
    type: "password",

    min: 8,
    max: 20,

    validation: {},
    validate: ["length"],
    alsoValidate: ["confirm_password"],
  };
  confirm_password = {
    omit: true,
    id: "confirm_password",
    name: "Confirmar Contraseña",
    value: null,
    type: "password",

    equalsTo: this.new_password,

    validation: {},
    validate: ["equals"],
  };
  userValidation() {
    console.log("eeee");
    this.password.required = false;
    this.password.omit = true;
  }
}
