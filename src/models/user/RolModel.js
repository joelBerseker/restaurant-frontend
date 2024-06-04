import { Model } from "@/models/";

export class RolModel extends Model {
  name = {
    id: "name",
    name: "Nombre",

    value: null,

    validation: {},
    validate: ["length"],
  };
  description = {
    id: "description",
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
      text: this.name.value,
    };
  }
  getText() {
    return this.id.value + " - " + this.name.value;
  }
}
