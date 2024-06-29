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
    required: false,

    validation: {},
    validate: ["length"],
  };

  id_typeproduct = {
    id: "id_typeproduct",
    name: "Tipo de Producto",
    value: null,
    additional: {},
    validation: {},
    getValueText() {
      return this.additional.name;
    },
  };

  product_type_image = {
    id: "product_type_image",
    name: "Imagen del Tipo de Producto",
    type: "image",
    value: null,
    file: null,
    required: false,
    validation: {},
  };

  price = {
    id: "price",
    name: "Precio",
    type: "decimal",
    value: null,
    validation: {},
    default: "0.00",
    required: false,
    validate: ["length", "decimal"],
  };

  discount = {
    id: "discount",
    name: "Descuento",
    type: "number",

    value: null,
    required: false,
    validation: {},
    default: "0",
    required: false,
    validate: ["length", "number"],
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.name.value,
      additional: ` S/. ${this.price.value} - ${this.description.value}`,
      price: this.price.value,
    };
  }
}
