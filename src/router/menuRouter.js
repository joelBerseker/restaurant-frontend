export const menuRouter = {
  path: "/menu",
  name: "menu",
  component: () => import("@/components/menu/views/MenuView.vue"),
  redirect: { name: "menuList" },
  meta: {
    requiresAuth: true,
    moduleid: 7,
  },
  children: [
    {
      path: "",
      name: "menuList",
      component: () => import("@/components/menu/views/MenuListView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 7,
        icon: "fa-solid fa-utensils",
        title: "Menus",
      },
    },
    {
      path: "/menu/add",
      name: "menuAdd",
      component: () => import("@/components/menu/views/MenuAddView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 7,
        action: 1,
        icon: "fa-solid fa-plus",
        title: "Agregar Menu",
      },
    },
    {
      path: "/menu/detail/:id",
      name: "menuDetail",
      component: () => import("@/components/menu/views/MenuDetailView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 7,
        icon: "fa-solid fa-bars-staggered",
        title: "Visualizar Menu",
      },
    },
  ],
};
