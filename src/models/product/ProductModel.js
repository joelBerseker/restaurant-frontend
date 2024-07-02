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
    type: "select",
    value: null,
    additionalKey: "name",
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

    validate: ["length", "decimal"],
  };

  discount = {
    id: "discount",
    name: "Descuento",
    type: "number",

    value: null,

    validation: {},
    default: "0",

    validate: ["length", "number"],
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.name.value,
      additional: ` S/. ${this.price.value} - ${this.description.value}`,
      price: this.price.value,
      section: "product",
    };
  }
  getText() {
    return this.id.value + " - " + this.name.value;
  }
  getTextModel() {
    return "Producto [" + this.id.value + " - " + this.name.value + "]";
  }
  getDataTable() {
    return [
      {
        label: "ID",
        field: "id",
        sortable: true,
        searchable: true,

        width: "1%",
      },
      {
        label: this.name.name,
        field: this.name.id,
        searchable: true,
        sortable: true,
      },
      {
        label: this.id_typeproduct.name,
        field:
          this.id_typeproduct.id + "__" + this.id_typeproduct.additionalKey,
        searchable: true,
        sortable: true,
      },

      {
        label: this.price.name,
        field: this.price.id,
        columnClass: "number no-wrap",
        sortable: true,
        display: (row) => {
          return "S/. " + row.price;
        },
      },

      {
        label: this.discount.name,
        field: this.discount.id,

        columnClass: "number no-wrap",

        sortable: true,
        display: (row) => {
          return row.discount + " %";
        },
      },
    ];
  }
}
