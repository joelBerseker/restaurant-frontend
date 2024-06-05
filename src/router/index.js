import { createRouter, createWebHistory } from "vue-router";
import { authService } from "@/services";
import { userRouter } from "./userRouter";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "system",
      redirect: { name: "home" },

      component: () => import("@/components/system/SystemView.vue"),
      meta: {
        requiresAuth: true, // Esta ruta requiere autenticación
      },
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/components/home/HomeView.vue"),
          meta: {
            requiresAuth: false, // Esta ruta no requiere autenticación
            moduleid: 0,
          },
        },
        userRouter,
        {
          path: "/rol",
          name: "rol",
          component: () => import("@/components/rol/RolView.vue"),
          meta: {
            requiresAuth: false, // Esta ruta no requiere autenticación
            moduleid: 0,
          },
        },
        {
          path: "/table",
          name: "table",
          component: () => import("@/components/table/TableView.vue"),
          meta: {
            requiresAuth: false, // Esta ruta no requiere autenticación
            moduleid: 0,
          },
        },
      ],
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

import { useUserStore, useSystemStore } from "@/stores/"; // Asegúrate de proporcionar la ruta correcta a tu tienda

router.beforeEach(async (to, from, next) => {
  const system = useSystemStore();

  const userStore = useUserStore();
  const isLoggedIn = userStore.isActive;
  console.log("->" + isLoggedIn);
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
    next("/login");
  } else if (to.fullPath === "/login" && isLoggedIn) {
    // Si el usuario ya está autenticado y trata de acceder a la página de inicio de sesión, redirige a la página de inicio (por ejemplo, /home)
    next("/");
  } else {
    const module_id = to.meta.moduleid;
    system.isLoadingContentSystem(true);

    const hasPermission = true; /*await permissionsService.getPermises(
      module_id,
      Permission_data.View
    );*/
    if (to.fullPath !== "/login") {
      await authService.setPermisos();
    }
    if (hasPermission || module_id == 0) {
      next();
    } else {
      // Si el usuario no tiene permisos, muestra un mensaje de alerta y redirige a la página de inicio
      alert("No tienes permiso para entrar");
      next("/");
    }
  }
});

export default router;
