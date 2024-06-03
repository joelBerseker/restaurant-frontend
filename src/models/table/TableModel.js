import { validations } from "@/helpers/validations";
import { isEmpty } from "@/helpers/utilities";
import { Model } from "@/models/";

export class TableModel extends Model {
  name = {
    id: "name",
    name: "Nombre",
    value: null,
    required: false, // blank=True in Django
    validation: {},
    validate: ["length"],
  };

  number = {
    id: "number",
    name: "Sitios",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["number"],
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
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.name.value,
    };
  }
}
