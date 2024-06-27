import { Model } from "@/models/";

export class TicketDetailModel extends Model {
  ticket_id = {
    value: null,
  };

  is_menu = {
    id: "is_menu",
    name: "Es Menu",
    value: false,
  };

  product_id = {
    type: "select",
    id: "product_id",
    name: "Producto",
    additional: {},

    getValueText() {
      return this.additional.name;
    },
    value: null,
    validation: {},
  };

  price = {
    id: "price",
    name: "Precio Total",
    value: null,
    validation: {},
    validate: ["decimal"],
    required: false, // null=True, blank=True in Django
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
    value: null,
    default: "Sin descripción",
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
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
