import { Model } from "@/models/";

export class MenuModel extends Model {
  name = {
    id: "name",
    name: "Nombre",
    value: null,
    validation: {},
    validate: ["length"],
  };

  starters = {
    id: "starters",
    name: "Entradas",
    element: {
      id: "starter",
      name: "Entrada",
      value: null,
      validation: {},
    },
    value: [],
    additional: {},

    validation: {},
    getValueText() {
      if (!this.additional) return [];
      let resp = [];
      for (let i = 0; i < this.additional.length; i++) {
        const element = this.additional[i];
        resp.push({
          text: element.name,
          additional: "S/. " + element.price + " - " + element.description,
        });
      }
      return resp;
    },
  };

  main_courses = {
    id: "main_courses",
    name: "Platos principales",
    element: {
      id: "starter",
      name: "Entrada",
      value: null,
      validation: {},
    },
    value: [],
    additional: [],
    validation: {},
    getValueText() {
      if (!this.additional) return [];
      let resp = [];
      for (let i = 0; i < this.additional.length; i++) {
        const element = this.additional[i];
        resp.push({
          text: element.name,
          additional: "S/. " + element.price + " - " + element.description,
        });
      }
      return resp;
    },
  };

  day = {
    id: "day",
    name: "Día",
    value: null,
    required: true, // No null or blank in Django, has default value
    validation: {},
    default: 1,
  };

  price = {
    id: "price",
    name: "Precio",
    value: null,
    required: true, // No null or blank in Django, has default value
    validation: {},
    validate: ["decimal", "length"],
    default: "0.00",
  };

  is_publish = {
    id: "is_publish",
    name: "Publicado",
    value: true,
  };

  getDataOptions() {
    return {
      value: this.id.value,
      text: this.menu_name.value,
    };
  }
  getTextModel() {
    return "Menu " + this.id.value + " - " + this.name.value;
  }
}
