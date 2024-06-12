import TicketView from "@/components/ticket/views/TicketView.vue";
import TicketListView from "@/components/ticket/views/TicketListView.vue";
import TicketAddView from "@/components/ticket/views/TicketAddView.vue";
import TicketDetailView from "@/components/ticket/views/TicketDetailView.vue";

export const ticketRouter = {
  path: "/ticket",
  name: "ticket",
  component: TicketView,
  redirect: { name: "ticketList" },
  meta: {
    requiresAuth: true,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "ticketList",
      component: TicketListView,
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
      component: TicketAddView,
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
      component: TicketDetailView,
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-bars-staggered",
        title: "Visualizar Boleta",
      },
    },
  ],
};
