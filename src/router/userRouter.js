export const userRouter = {
  path: "/user_management/user",
  name: "user",
  component: () => import("@/components/user/views/UserView.vue"),
  redirect: { name: "userList" },
  meta: {
    requiresAuth: true,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "userList",
      component: () => import("@/components/user/views/UserListView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-user",
        title: "Usuarios",
      },
    },
    {
      path: "/user_management/user/add",
      name: "userAdd",
      component: () => import("@/components/user/views/UserAddView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-plus",
        title: "Agregar Usuario",
      },
    },
    {
      path: "/user_management/user/detail/:id",
      name: "userDetail",
      component: () => import("@/components/user/views/UserDetailView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-bars-staggered",
        title: "Visualizar Usuario",
      },
    },
  ],
};
