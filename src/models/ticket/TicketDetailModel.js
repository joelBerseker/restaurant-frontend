import { Model } from "@/models/";

export class TicketDetailModel extends Model {
  ticket_id = {
    id: "ticket_id",
    name: "Ticket",
    value: null,
    aditional: {},
    validation: {},
    validate: ["select"],
  };

  quantity = {
    id: "quantity",
    name: "Cantidad",
    value: null,
    validation: {},
    validate: ["number"],
  };

  product_id = {
    id: "product_id",
    name: "Producto",
    value: null,
    aditional: {},
    validation: {},
    validate: ["select"],
  };

  description = {
    id: "description",
    name: "Descripción",
    value: null,
    required: false, // null=True, blank=True in Django
    type: "textarea",
    validation: {},
    validate: ["length"],
    default: "Sin descripción",
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.ticketdetail_name.value,
    };
  }
}
