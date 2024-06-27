export const ticketRouter = {
  path: "/ticket",
  name: "ticket",
  component: () => import("@/components/ticket/views/TicketView.vue"),
  redirect: { name: "ticketList" },
  meta: {
    requiresAuth: true,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "ticketList",
      component: () => import("@/components/ticket/views/TicketListView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "Fa-regular fa-rectangle-list",
        title: "Boletas",
      },
    },
    {
      path: "/ticket/add",
      name: "ticketAdd",
      component: () => import("@/components/ticket/views/TicketAddView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-plus",
        title: "Agregar Boleta",
      },
    },
    {
      path: "/ticket/detail/:id",
      name: "ticketDetail",
      component: () => import("@/components/ticket/views/TicketDetailView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-bars-staggered",
        title: "Visualizar Boleta",
      },
    },
  ],
};
