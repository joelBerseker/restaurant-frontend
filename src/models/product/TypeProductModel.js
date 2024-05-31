import { Model } from "@/models/";

export class TypeProductModel extends Model {
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
    validation: {},
    validate: ["length"],
  };

  product_image = {
    id: "product_image",
    name: "Imagen del Producto",
    value: null,
    required: false, // blank=True in Django
    validation: {},
    validate: ["file"],
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.name.value,
    };
  }
}
