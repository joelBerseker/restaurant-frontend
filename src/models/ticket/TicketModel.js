import { Model } from "@/models/";

export class TicketModel extends Model {
  code = {
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
    required: false, // blank=True in Django
    validation: {},
    validate: ["length", "number"],
  };

  priceTotal = {
    id: "priceTotal",
    name: "Precio Total",
    type: "decimal",
    value: null,
    default: "0.00",
    required: false,
    validation: {},
    validate: ["length", "decimal"],
  };
  priceFinal = {
    id: "priceFinal",
    name: "Precio Final",
    type: "decimal",
    value: null,
    default: "0.00",
    required: false,
    validation: {},
    validate: ["length", "decimal"],
  };
  check_discount = {
    id: "check_discount",
    name: "Tiene Descuento",
    type: "boolean",
    value: null,
  };

  user_id = {
    id: "user_id",
    name: "Usuario",
    type: "select",
    value: null,
    aditional: {},

    validation: {},
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
}
