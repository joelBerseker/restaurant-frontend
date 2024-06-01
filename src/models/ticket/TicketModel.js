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
    validate: ["length"],
  };

  discount = {
    id: "discount",
    name: "Descuento",
    value: null,
    required: false, // blank=True in Django
    validation: {},
    validate: ["number"],
  };

  priceTotal = {
    id: "priceTotal",
    name: "Precio Total",
    value: null,
    validation: {},
    validate: ["number"],
  };

  user_id = {
    id: "user_id",
    name: "Usuario",
    value: null,
    aditional: {},
    validation: {},
    validate: ["select"],
  };

  table_id = {
    id: "table_id",
    name: "Mesa",
    value: null,
    required: false, // blank=True in Django
    aditional: {},
    validation: {},
    validate: ["select"],
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.ticket_name.value,
    };
  }
}
