import { Model } from "@/models/";

export class ProductModel extends Model {
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

  id_typeproduct = {
    id: "id_typeproduct",
    name: "Tipo de Producto",
    value: null,
    additional: {},
    validation: {},
    validate: ["select"],
  };

  product_type_image = {
    id: "product_type_image",
    name: "Imagen del Tipo de Producto",
    value: null,
    validation: {},
    validate: ["file"],
  };

  price = {
    id: "price",
    name: "Precio",
    value: null,
    validation: {},
    validate: ["number"],
  };

  discount = {
    id: "discount",
    name: "Descuento",
    value: null,
    required: false,
    validation: {},
    validate: ["number"],
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.name.value,
    };
  }
}
