import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "system",
      component: () => import("@/components/system/SystemView.vue"),
      meta: {
        requiresAuth: false, // Esta ruta requiere autenticación
      },
      children: [],
    },
    {
      path: "/autentication",
      name: "auth",
      component: () => import("@/components/auth/AuthView.vue"),
      meta: {
        requiresAuth: false, // Esta ruta no requiere autenticación
        moduleid: 0,
      },
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("@/components/auth/LoginView.vue"),
          meta: {
            requiresAuth: false, // Esta ruta no requiere autenticación
            moduleid: 0,
          },
        },
      ],
    },
  ],
});

export default router;
