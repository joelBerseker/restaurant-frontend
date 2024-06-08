import UserView from "@/components/user/views/UserView.vue";
import UserListView from "@/components/user/views/UserListView.vue";
import UserAddView from "@/components/user/views/UserAddView.vue";
import UserDetailView from "@/components/user/views/UserDetailView.vue";

export const userRouter = {
  path: "/user",
  name: "user",
  component: UserView,
  redirect: { name: "userList" },
  meta: {
    requiresAuth: true,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "userList",
      component: UserListView,
      meta: {
        requiresAuth: true,
        moduleid: 0,
      },
    },
    {
      path: "/user/add",
      name: "userAdd",
      component: UserAddView,
      meta: {
        requiresAuth: true,
        moduleid: 0,
      },
    },
    {
      path: "/user/detail/:id",
      name: "userDetail",
      component: UserDetailView,
      meta: {
        requiresAuth: true,
        moduleid: 0,
      },
    },
  ],
};
