import { Model } from "@/models/";

export class TicketModel extends Model {
  code = {
    omit: true,
    id: "code",
    name: "Código",
    value: null,
  };

  ruc = {
    id: "ruc",
    name: "RUC",
    value: null,
    required: false, // blank=True in Django
    validation: {},
    validate: ["length", "number"],
  };

  discount = {
    id: "discount",
    name: "Descuento",
    type: "number",
    value: null,
    default: "0",

    validation: {},
    validate: ["length", "number"],
  };

  priceTotal = {
    id: "priceTotal",
    name: "Precio Total",
    type: "decimal",
    value: null,
    default: "0.00",

    validation: {},
    validate: ["length", "decimal"],
  };
  priceFinal = {
    id: "priceFinal",
    name: "Precio Final",
    type: "decimal",
    value: null,
    default: "0.00",

    validation: {},
    greaterThan: "0.00",
    validate: ["length", "decimal", "greaterThan"],
  };
  check_discount = {
    id: "check_discount",
    name: "Tiene Descuento",
    type: "boolean",
    value: null,
  };

  user_id = {
    omit: true,
    id: "user_id",
    name: "Encargado",
    type: "select",
    value: null,
    additional: {},
    getValueText() {
      if (!this.additional) return;
      return this.additional.first_name + " " + this.additional.last_name;
    },
  };

  table_id = {
    id: "table_id",
    name: "Mesa",
    type: "select",
    value: null,
    required: false, // blank=True in Django
    aditional: {},
    validation: {},
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: `${this.code.value} - s/ ${this.priceFinal.value}`,
    };
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
        label: this.code.name,
        field: this.code.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.user_id.name,
        field: this.user_id.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.ruc.name,
        field: this.ruc.id,
        sortable: true,
        searchable: true,
      },

      {
        label: this.priceTotal.name,
        field: this.priceTotal.id,
        sortable: true,
        searchable: true,
        columnClass: "number",
        width: "1%",
      },
      {
        label: this.discount.name,
        field: this.discount.id,
        sortable: true,
        searchable: true,
        columnClass: "number",
        width: "1%",
      },
      {
        label: this.priceFinal.name,
        field: this.priceFinal.id,
        sortable: true,
        searchable: true,
        columnClass: "number",
        width: "1%",
      },
    ];
  }
}
