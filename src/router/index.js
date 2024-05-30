import { createRouter, createWebHistory } from "vue-router";
import { authService } from "@/services";
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

import { useUserStore, useSystemStore } from "@/stores/"; // Asegúrate de proporcionar la ruta correcta a tu tienda

router.beforeEach(async (to, from, next) => {
  const system = useSystemStore();

  const userStore = useUserStore();
  const isLoggedIn = userStore.isActive;

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
    next("/ingreso");
  } else if (to.fullPath === "/ingreso" && isLoggedIn) {
    // Si el usuario ya está autenticado y trata de acceder a la página de inicio de sesión, redirige a la página de inicio (por ejemplo, /home)
    next("/inicio");
  } else {
    const module_id = to.meta.moduleid;
    system.isLoadingContentSystem(true);

    const hasPermission = true; /*await permissionsService.getPermises(
      module_id,
      Permission_data.View
    );*/
    if (to.fullPath !== "/ingreso") {
      await authService.setPermisos();
    }
    if (hasPermission || module_id == 0) {
      next();
    } else {
      // Si el usuario no tiene permisos, muestra un mensaje de alerta y redirige a la página de inicio
      alert("No tienes permiso para entrar");
      next("/inicio");
    }
  }
});

export default router;
