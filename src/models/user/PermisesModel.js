
import { Model } from "@/models/";

export class PermisesModel extends Model {

  permises_name = {
    id: "permises_name",
    name: "Nombre",

    value: null,

    validation: {},
    validate: ["length"],
  };
  permises_description = {
    id: "permises_description",
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
      text: this.permises_name.value,
    };
  }
}
