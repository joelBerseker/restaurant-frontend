import { validations } from "@/helpers/validations";
import { isEmpty } from "@/helpers/utilities";
import { Model } from "@/models/";

export class TableModel extends Model {
  name = {
    id: "name",
    name: "Nombre",
    value: null,
    validation: {},
    validate: ["length"],

    default_test: "Mesa de Prueba",
  };

  number = {
    id: "number",
    name: "Numero de Asientos",
    type: "number",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length", "number"],
    default: "0",
    default_test: "3",
  };

  description = {
    id: "description",
    name: "Descripción",
    value: null,
    required: false, // null=True in Django
    type: "textarea",
    validation: {},
    validate: ["length"],
    default: "Sin descripción",
    default_test: "Sin descripción",
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
  getTextModel() {
    return "Mesa " + this.id.value + " - " + this.name.value;
  }
}
