import { isEmpty } from "@/helpers/utilities";

const status = {
  options: [
    {
      value: "0",
      text: "Todos",
      color: "",
      icon: "fa-solid fa-bars-staggered",
    },
    {
      value: "1",
      text: "Activo",
      color: "active",
      icon: "fa-solid fa-circle-check",
    },
    {
      value: "2",
      text: "Inactivo",
      color: "inactive",
      icon: "fa-solid fa-circle-xmark",
    },
    {
      value: "3",
      text: "Eliminado",
      color: "delete",
      icon: "fa-solid fa-circle-minus",
    }, // para la vista de administrador
  ],
  get(value) {
    if (isEmpty(value)) return value;
    return this.options[value].text;
  },
  getAll(value) {
    if (isEmpty(value)) return value;
    return this.options[value];
  },
  getClass(value) {
    if (isEmpty(value)) return value;
    return this.options[value].color;
  },
  getIcon(value) {
    if (isEmpty(value)) return value;
    return this.options[value].icon;
  },
};

const confirmation = {
  options: [
    { value: true, text: "Si" },
    { value: false, text: "No" },
  ],
  get(value) {
    return value ? "Si" : "No";
  },
};

export { status, confirmation };
