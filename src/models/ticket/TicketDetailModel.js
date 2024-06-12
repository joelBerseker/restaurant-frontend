import { Model } from "@/models/";

export class TicketDetailModel extends Model {
  ticket_id = {
    id: "ticket_id",
    name: "Ticket",
    value: null,
  };

  quantity = {
    id: "quantity",
    name: "Cantidad",
    type: "number",
    value: null,
    validation: {},
    validate: ["length", "number"],
  };

  product_id = {
    id: "product_id",
    name: "Producto",
    value: null,
    aditional: {},
    validation: {},
  };

  description = {
    id: "description",
    name: "Descripción",
    value: null,
    required: false, // null=True, blank=True in Django

    validation: {},
    validate: ["length"],
    default: "Sin descripción",
  };
  initModel(data) {
    this.ticket_id.value = data;
  }
  getDataOptions() {
    return {
      value: this.id.value,
      text: this.ticketdetail_name.value,
    };
  }
}
