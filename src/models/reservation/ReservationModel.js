import { Model } from "@/models/";

export class ReservationModel extends Model {
  user_id = {
    id: "user_id",
    name: "Usuario",
    value: null,
    aditional: {},
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["select"],
  };

  date = {
    id: "date",
    name: "Fecha de Reserva",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["date"],
  };

  hour = {
    id: "hour",
    name: "Hora de Reserva",
    value: null,
    required: true, // null=True in Django
    validation: {},
    validate: ["time"],
  };

  number_person = {
    id: "number_person",
    name: "Numero de personas",
    value: null,
    required: false, // null=True in Django
    validation: {},
    validate: ["number"],
    default: 0,
  };

  description = {
    id: "description",
    name: "Descripcion de la Reserva",
    type: "textarea",
    value: null,
    required: false, // blank=True, null=True in Django
    validation: {},
    validate: ["length"],
    default: "Sin descripción",
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: `${this.id.value} - Reserva para el: ${this.date.value}, a las ${this.hour}`,
    };
  }
}
