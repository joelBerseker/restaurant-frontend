import { Model } from "@/models/";

export class TicketDetailModel extends Model {
  ticket_id = {
    value: null,
    additionalKey: "code",
    additional: {},
    getValueText() {
      if (!this.additional) return;
      return this.additional.code;
    },
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
    additionalKey: "name",
    additional: {},

    getValueText() {
      if (!this.additional) return;
      return this.additional.name;
    },
    value: null,
    validation: {},
  };

  price = {
    id: "price",
    name: "Precio",
    type: "decimal",

    default: "0.00",
    value: null,
    validation: {},
    validate: ["length", "decimal"],
  };

  price_total = {
    id: "price_total",
    name: "Precio Total",
    type: "decimal",

    default: "0.00",
    value: null,
    validation: {},
    validate: ["length", "decimal"],
  };

  quantity = {
    id: "quantity",
    name: "Cantidad",
    type: "number",
    default: "1",
    value: null,
    validation: {},
    greaterThan: "0",

    validate: ["length", "number", "greaterThan"],
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
        label: this.price.name,
        field: this.price.id,
        width: "20%",

        columnClass: "number no-wrap",
      },
      {
        label: this.quantity.name,
        field: this.quantity.id,
        columnClass: "number no-wrap",
        width: "20%",
      },
      {
        label: this.price_total.name,
        field: this.price_total.id,
        width: "20%",

        columnClass: "number no-wrap",
      },
    ];
  }
}
