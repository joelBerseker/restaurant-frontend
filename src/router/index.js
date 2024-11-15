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
        {
          path: "/profile",
          name: "userProfile",
          component: () =>
            import("@/components/user/views/UserProfileView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
            action: 2,
            icon: "fa-solid fa-address-card",
            title: "Mi Perfil",
          },
        },
        {
          path: "/company",
          name: "company",
          component: () => import("@/components/company/CompanyView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 2,
            action: 2,
            icon: "fa-solid fa-building-user",
            title: "Mi Empresa",
          },
        },
        {
          path: "/notification",
          name: "notification",
          component: () =>
            import("@/components/notification/NotificationView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 1,
            action: 2,
            icon: "fa-solid fa-bell",
            title: "Notificaciones",
          },
        },
        {
          path: "/user_management",
          name: "userManagement",
          redirect: { name: "userManagementList" },
          component: () =>
            import("@/components/section/views/UserManagementView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
          },
          children: [
            {
              path: "",
              name: "userManagementList",
              component: () =>
                import(
                  "@/components/section/viewsList/UserManagementListView.vue"
                ),
              meta: {
                requiresAuth: true,
                moduleid: 0,
                icon: "fa-solid fa-user-gear",
                title: "Gestión de Usuarios",
              },
            },
            userRouter,
            {
              path: "/rol/:id?",
              name: "rol",
              component: () => import("@/components/rol/RolView.vue"),
              meta: {
                requiresAuth: true,
                moduleid: 3,
                icon: "fa-solid fa-user-tag",
                title: "Roles",
              },
            },
            {
              path: "/permises/:id?",
              name: "permise",
              component: () => import("@/components/permises/PermisesView.vue"),
              meta: {
                requiresAuth: true,
                moduleid: 4,
                icon: "fa-solid fa-users-gear",
                title: "Permisos",
              },
            },
          ],
        },
        {
          path: "/product_management",
          name: "productManagement",
          redirect: { name: "productManagementList" },
          component: () =>
            import("@/components/section/views/ProductManagementView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
          },
          children: [
            {
              path: "",
              name: "productManagementList",
              component: () =>
                import(
                  "@/components/section/viewsList/ProductManagementListView.vue"
                ),
              meta: {
                requiresAuth: true,
                moduleid: 0,
                icon: "fa-solid fa-boxes-stacked",
                title: "Gestión de Productos",
              },
            },
            productRouter,
            menuRouter,
            {
              path: "/product_type/:id?",
              name: "productType",
              component: () =>
                import("@/components/productType/ProductTypeView.vue"),
              meta: {
                requiresAuth: true,
                moduleid: 7,
                icon: "fa-solid fa-tags",
                title: "Tipo de Producto",
              },
            },
            {
              path: "/card_menu",
              name: "cardMenu",
              component: () => import("@/components/cardMenu/CardMenuView.vue"),
              meta: {
                requiresAuth: true,
                moduleid: 99,
                icon: "fa-solid fa-book-open",
                title: "Carta",
              },
            },
          ],
        },
        {
          path: "/table_management",
          name: "tableManagement",
          redirect: { name: "tableManagementList" },
          component: () =>
            import("@/components/section/views/TableManagementView.vue"),
          meta: {
            requiresAuth: true,
            moduleid: 0,
          },
          children: [
            {
              path: "",
              name: "tableManagementList",
              component: () =>
                import(
                  "@/components/section/viewsList/TableManagementListView.vue"
                ),
              meta: {
                requiresAuth: true,
                moduleid: 0,
                icon: "fa-solid fa-border-all",
                title: "Gestión de Mesas",
              },
            },
            {
              path: "/table/:id?",
              name: "table",
              component: () => import("@/components/table/TableView.vue"),
              meta: {
                requiresAuth: true,
                moduleid: 5,
                icon: "fa-solid fa-border-all",
                title: "Mesas",
              },
            },
            {
              path: "/reservation/:id?",
              name: "reservation",
              component: () =>
                import("@/components/reservation/ReservationView.vue"),
              meta: {
                requiresAuth: true,
                moduleid: 9,
                icon: "fa-regular fa-calendar-days",
                title: "Reservaciones",
              },
            },
          ],
        },
        ticketRouter,
        testRouter,
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
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});

import { useUserStore, useSystemUtilStore } from "@/stores/"; // Asegúrate de proporcionar la ruta correcta a tu tienda
import { sleep } from "@/helpers";
import { ticketRouter } from "./ticketRouter";
import { menuRouter } from "./menuRouter";
let first_time = false;
router.beforeEach(async (to, from, next) => {
  const useSystemUtil = useSystemUtilStore();

  const userStore = useUserStore();
  const isLoggedIn = userStore.isActive;
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
    next("/login");

    first_time = true;
    return;
  } else if (to.fullPath === "/login" && isLoggedIn) {
    // Si el usuario ya está autenticado y trata de acceder a la página de inicio de sesión, redirige a la página de inicio (por ejemplo, /home)
    next("/");

    first_time = true;
    return;
  } else {
    const module_id = to.meta.moduleid;

    if (to.meta.type === "tab") {
      next();
      return;
    }
    useSystemUtil.isLoadingContentSystem(true);

    /*await permissionsService.getPermises(
      module_id,
      Permission_data.View
    );*/

    if (to.fullPath !== "/login") {
      await authService.setPermisos();
      if (!first_time) {
        authService.setUser();
      }
    }
    userStore.setModulePermises(module_id);
    let hasPermission = userStore.getPermiseAction(module_id, to.meta.action);

    if (hasPermission || module_id == 0) {
      next();

      first_time = true;
      return;
    } else {
      // Si el usuario no tiene permisos, muestra un mensaje de alerta y redirige a la página de inicio
      alert("No tienes permiso para entrar");

      next("/");

      first_time = true;
      return;
    }
  }
});

export default router;
