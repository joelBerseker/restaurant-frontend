
import { Model } from "@/models/";

export class UserModel extends Model {

  user_name = {
    id: "user_name",
    name: "Nombre",

    value: null,

    validation: {},
    validate: ["length"],
  };
  user_description = {
    id: "user_description",
    name: "Descripción",
    type: "textarea",

    value: null,
    default: "Sin descripción",

    required: false,
    validation: {},
    validate: ["length"],
  };
  
  getDataOptions() {
    return {
      value: this.id.value,
      text: this.user_name.value,
    };
  }
}
