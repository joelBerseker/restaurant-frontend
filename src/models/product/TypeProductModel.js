import { confirmation } from "@/helpers";
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

    required: false,
    default: "Sin descripción",
    validation: {},
    validate: ["length"],
  };

  product_image = {
    id: "product_image",
    name: "Imagen del Producto",
    type: "image",

    value: null,
    file: null,
    required: false,
    validation: {},
  };
  is_publish = {
    id: "is_publish",
    name: "Publicado",
    value: true,
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
    return "Tipo de Producto [" + this.id.value + " - " + this.name.value + "]";
  }
  getDataTable() {
    return [
      {
        label: "ID",
        field: "id",
        sortable: true,
        width: "1%",
      },
      {
        label: this.name.name,
        field: this.name.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.description.name,
        field: this.description.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.is_publish.name,
        field: this.is_publish.id,
        sortable: true,

        width: "1%",
        display: (row) => {
          return confirmation.get(row.is_publish);
        },
      },
    ];
  }
}
