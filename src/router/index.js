import { createRouter, createWebHistory } from "vue-router";
import { authService } from "@/services";
import { userRouter } from "./userRouter";
import { productRouter } from "./productRouter";
import { testRouter } from "./testRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "system",
      redirect: { name: "home" },
      component: () => import("@/components/system/SystemView.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/components/home/HomeView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
            icon: "fa-solid fa-house",
            title: "Inicio",
          },
        },
        userRouter,
        productRouter,
        ticketRouter,
        testRouter,
        menuRouter,
        {
          path: "/rol/:id?",
          name: "rol",
          component: () => import("@/components/rol/RolView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
            icon: "fa-solid fa-users-gear",
            title: "Roles",
          },
        },
        userRouter,
        {
          path: "/table/:id?",
          name: "table",
          component: () => import("@/components/table/TableView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
            icon: "fa-solid fa-border-all",
            title: "Mesas",
          },
        },
        {
          path: "/product_type/:id?",
          name: "productType",
          component: () =>
            import("@/components/productType/ProductTypeView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
            icon: "fa-solid fa-tags",
            title: "Tipo de Producto",
          },
        },
      ],
    },
    {
      path: "/autentication",
      name: "auth",
      component: () => import("@/components/auth/AuthView.vue"),
      meta: {
        requiresAuth: false,
        moduleid: 0,
      },
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("@/components/auth/LoginView.vue"),
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
import { ticketRouter } from "./ticketRouter";
import { menuRouter } from "./menuRouter";

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

    if (to.meta.type === "tab") {
      next();
      return;
    }
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
