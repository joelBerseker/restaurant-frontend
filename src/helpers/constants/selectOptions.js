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

const module = {
  options: [
    { id: 1, name: "Usuarios" },
    { id: 2, name: "Compañia" }, // usuario, roles/permisos
    { id: 3, name: "Roles" }, // conductores
    { id: 4, name: "Permisos" },
    { id: 5, name: "Mesas" },
    { id: 6, name: "Tipo de Productos" },
    { id: 7, name: "Productos" },
    { id: 8, name: "Boleta" },
    { id: 9, name: "Reservas" },
  ],
  get(value) {
    if (isEmpty(value)) return value;
    return this.options[value - 1].name;
  },
};

const days = {
  options: [
    { value: 0, text: "Todos los dias" },
    { value: 1, text: "Lunes" },
    { value: 2, text: "Martes" },
    { value: 3, text: "Miercoles" },
    { value: 4, text: "Jueves" },
    { value: 5, text: "Viernes" },
    { value: 6, text: "Sabado" },
    { value: 7, text: "Domingo" },
  ],
  get(value) {
    if (isEmpty(value)) return value;
    return this.options[value].text;
  },
};

export { status, confirmation, days, module };
