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
    type: "date",
    value: null,
    validation: {},
  };

  hour = {
    id: "hour",
    name: "Hora de Reserva",
    type: "time",
    value: null,
    validation: {},
  };

  number_person = {
    id: "number_person",
    name: "Numero de personas",
    type: "number",

    value: null,
    validation: {},
    validate: ["number", "length"],
    default: "0",
  };

  description = {
    id: "description",
    name: "Descripcion de la Reserva",
    type: "textarea",
    value: null,
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
