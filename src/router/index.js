import { createRouter, createWebHistory } from "vue-router";
import { authService } from "@/services";
import { userRouter } from "./userRouter";

import SystemView from "@/components/system/SystemView.vue";
import HomeView from "@/components/home/HomeView.vue";

import RolView from "@/components/rol/RolView.vue";
import TableView from "@/components/table/TableView.vue";
import AuthView from "@/components/auth/AuthView.vue";
import LoginView from "@/components/auth/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "system",
      redirect: { name: "home" },
      component: SystemView,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
          meta: {
            requiresAuth: false,
            moduleid: 0,
          },
        },
        userRouter,
        {
          path: "/rol",
          name: "rol",
          component: RolView,
          meta: {
            requiresAuth: false,
            moduleid: 0,
          },
        },
        userRouter,
        {
          path: "/table",
          name: "table",
          component: TableView,
          meta: {
            requiresAuth: false,
            moduleid: 0,
          },
        },
      ],
    },
    {
      path: "/autentication",
      name: "auth",
      component: AuthView,
      meta: {
        requiresAuth: false,
        moduleid: 0,
      },
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
          meta: {
            requiresAuth: false,
            moduleid: 0,
          },
        },
      ],
    },
  ],
});

import { useUserStore, useSystemUtilStore } from "@/stores/"; // Asegúrate de proporcionar la ruta correcta a tu tienda
import { sleep } from "@/helpers";

router.beforeEach(async (to, from, next) => {
  console.log("entre");

  const useSystemUtil = useSystemUtilStore();

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
    useSystemUtil.isLoadingContentSystem(true);

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
