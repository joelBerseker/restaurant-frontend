export const testRouter = {
  path: "/test",
  name: "test",
  component: () => import("@/components/test/views/TestView.vue"),
  redirect: { name: "testReview" },

  meta: {
    requiresAuth: true,
    moduleid: 99,
    icon: "fa-solid fa-flask-vial",
    title: "Pruebas",
  },

  children: [
    {
      path: "/test/review",
      name: "testReview",
      component: () => import("@/components/test/views/TestReviewView.vue"),
      meta: {
        keepAlive: true,
        requiresAuth: true,
        moduleid: 99,
        icon: "Fa-regular fa-rectangle-list",
        title: "Revisión",
        type: "tab",
      },
    },
    {
      path: "/test/generate",
      name: "testGenerate",
      component: () => import("@/components/test/views/TestGenerateView.vue"),
      meta: {
        keepAlive: true,
        requiresAuth: true,
        moduleid: 99,
        icon: "fa-solid fa-plus",
        title: "Generar",
        type: "tab",
      },
    },
  ],
};
