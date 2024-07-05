import { formatData } from "@/helpers";
import { Model } from "@/models/";

export class ReservationModel extends Model {
  user_id = {
    id: "user_id",
    name: "Gestionado por",
    value: null,
    additionalKey: "first_name",
    additional: {},
    getValueText() {
      if (!this.additional) return;
      return this.additional.first_name + " " + this.additional.last_name;
    },
  };
  name = {
    id: "name",
    name: "Reservado por",
    value: null,
    validation: {},
    validate: ["length"],
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
      text: `${this.id.value} - Reserva para el: ${this.date.value}, a las ${this.hour.value}`,
    };
  }

  getText() {
    return (
      this.id.value +
      " - " +
      formatData.datesMin(this.date.value) +
      " " +
      formatData.times(this.hour.value)
    );
  }
  getTextModel() {
    return "Reservación [" + this.getText() + "]";
  }
  getDataTable() {
    return [
      {
        label: "ID",
        field: "id",
        sortable: true,
        searchable: true,

        width: "1%",
      },
      {
        label: this.name.name,
        field: this.name.id,
        sortable: true,
        searchable: true,
      },
      {
        label: this.user_id.name,
        field: this.user_id.id + "__" + this.user_id.additionalKey,
        sortable: true,
        searchable: true,
      },
      {
        label: this.date.name,
        field: this.date.id,
        sortable: true,
        display: (row) => {
          return formatData.dates(row.date);
        },
      },

      {
        label: this.hour.name,
        field: this.hour.id,
        sortable: true,
        display: (row) => {
          return formatData.times(row.hour);
        },
      },

      {
        label: this.number_person.name,
        field: this.number_person.id,
        sortable: true,

        columnClass: "number",
        width: "1%",
      },
    ];
  }
}
