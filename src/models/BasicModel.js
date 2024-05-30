import { Model } from "@/models/";
export class BasicModel extends Model {
  table_name = {
    id: "table_name",
    name: "Nombre",

    value: null,

    validation: {},
    validate: ["length"],
  };
  id_user = {
    id: "id_user",
    name: "Usuario",

    value: null,
    aditional: {},

    validation: {},
    validate: ["select"],
  };
  table_description = {
    id: "table_description",
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
      text: this.table_name.value,
    };
  }
}
