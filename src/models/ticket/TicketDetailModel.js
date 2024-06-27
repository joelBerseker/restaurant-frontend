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
    type: "decimal",

    default: "0.00",
    value: null,
    validation: {},
    validate: ["decimal"],
    required: false, // null=True, blank=True in Django
  };

  quantity = {
    id: "quantity",
    name: "Cantidad",
    type: "number",
    default: "0",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["number"],
  };

  description = {
    type: "textarea",
    id: "description",
    name: "Descripción",
    value: null,
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
  getDataTable() {
    return [
      {
        label: this.product_id.name,
        field: this.product_id.id,
      },
      {
        label: this.quantity.name,
        field: this.quantity.id,
        columnClass: "number",
      },
      {
        label: this.price.name,
        field: this.price.id,
        columnClass: "number",
      },
    ];
  }
}
