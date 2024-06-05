export const userRouter = {
  path: "/user",
  name: "user",
  component: () => import("@/components/user/views/UserView.vue"),
  redirect: { name: "userList" },
  meta: {
    requiresAuth: false,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "userList",
      component: () => import("@/components/user/views/UserListView.vue"),
      meta: {
        requiresAuth: false,
        moduleid: 0,
      },
    },
    {
      path: "/user/add",
      name: "userAdd",
      component: () => import("@/components/user/views/UserAddView.vue"),
      meta: {
        requiresAuth: false,
        moduleid: 0,
      },
    },
    {
      path: "/user/detail/:id",
      name: "userDetail",
      component: () => import("@/components/user/views/UserDetailView.vue"),
      meta: {
        requiresAuth: false,
        moduleid: 0,
      },
    },
  ],
};
