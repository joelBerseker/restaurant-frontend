export const ModulesName = [
  { id: 1, name: "Usuarios" },
  { id: 2, name: "Compañia" }, // usuario, roles/permisos
  { id: 3, name: "Roles" }, // conductores
  { id: 4, name: "Permisos" },
  { id: 5, name: "Mesas" },
  { id: 6, name: "Tipo de Productos" },
  { id: 7, name: "Productos" },
  { id: 8, name: "Boleta" },
  { id: 9, name: "Reservas" },
];
export const Permission_data = {
  Create: 1,
  View: 2,
  Active: 3,
  Edit: 4,
  Delete: 5,
  Print: 6,
  Export: 7,
};

export const Permissions_table = [
  {
    id: 0,
    label: "Modulo",
    field: "module_id",
  },
  {
    id: Permission_data.Create,
    label: "Crear",
    field: "create",
  },
  {
    id: Permission_data.View,
    label: "Ver",
    field: "read",
  },
  {
    id: Permission_data.Active,
    label: "Activo",
    field: "active",
  },
  {
    id: Permission_data.Edit,
    label: "Editar",
    field: "update",
  },
  {
    id: Permission_data.Delete,
    label: "Eliminar",
    field: "delete",
  },
  {
    id: Permission_data.Print,
    label: "Imprimir",
    field: "print",
  },
  {
    id: Permission_data.Export,
    label: "Exportar",
    field: "export",
  },
  {
    id: Permission_data.Export,
    label: "Notificaciones",
    field: "notify",
  },
];
