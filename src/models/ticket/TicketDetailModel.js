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

  is_menu = {
    id: "is_menu",
    name: "Es Menu",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["boolean"],
    default: true,
  };

  product_id = {
    id: "product_id",
    name: "Producto",
    value: null,
    aditional: {},
    validation: {},
    validate: ["number"],
  };

  price = {
    id: "price",
    name: "Precio Total",
    value: null,
    validation: {},
    validate: ["decimal"],
    default: 0,
  };

  quantity = {
    id: "quantity",
    name: "Cantidad",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["number"],
  };

  description = {
    id: "description",
    name: "Descripción",
    type: "textarea",
    value: null,
    default: "Sin descripción",
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
  };

  status = {
    id: "status",
    name: "Estado",
    value: null,
    validation: {},
    validate: ["select"],
    default: 1,
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
