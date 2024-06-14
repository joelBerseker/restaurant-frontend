import { Model } from "@/models/";

export class MenuModel extends Model {
  name = {
    id: "name",
    name: "Nombre",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["length"],
  };

  starters = {
    id: "starters",
    name: "Entradas",
    value: [],
    required: false, // blank=True in Django
    validation: {},
    validate: ["select"],
  };

  main_courses = {
    id: "main_courses",
    name: "Platos principales",
    value: [],
    required: false, // blank=True in Django
    validation: {},
    validate: ["select"],
  };

  day = {
    id: "day",
    name: "Día",
    value: null,
    required: true, // No null or blank in Django, has default value
    validation: {},
    validate: ["number"],
    default: 1,
  };

  price = {
    id: "price",
    name: "Precio s/",
    value: null,
    required: true, // No null or blank in Django, has default value
    validation: {},
    validate: ["decimal"],
    default: 0,
  };

  is_publish = {
    id: "is_publish",
    name: "Publicado",
    value: null,
    required: false, // null=True, blank=True in Django
    validation: {},
    validate: ["boolean"],
    default: true,
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
