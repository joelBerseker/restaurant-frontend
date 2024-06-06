
import { Model } from "@/models/";

export class AlexModel extends Model {

  alex_name = {
    id: "alex_name",
    name: "Nombre",

    value: null,

    validation: {},
    validate: ["length"],
  };
  alex_description = {
    id: "alex_description",
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
      text: this.alex_name.value,
    };
  }
}
