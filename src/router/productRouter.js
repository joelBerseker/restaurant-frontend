export const productRouter = {
  path: "/product",
  name: "product",
  component: () => import("@/components/product/views/ProductView.vue"),
  redirect: { name: "productList" },
  meta: {
    requiresAuth: true,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "productList",
      component: () => import("@/components/product/views/ProductListView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-boxes-stacked",
        title: "Productos",
      },
    },
    {
      path: "/product/detail/:id",
      name: "productDetail",
      component: () =>
        import("@/components/product/views/ProductDetailView.vue"),
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-bars-staggered",
        title: "Visualizar Producto",
      },
    },
  ],
};
