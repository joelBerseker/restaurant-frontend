import ProductView from "@/components/product/views/ProductView.vue";
import ProductListView from "@/components/product/views/ProductListView.vue";
import ProductDetailView from "@/components/product/views/ProductDetailView.vue";

export const productRouter = {
  path: "/product",
  name: "product",
  component: ProductView,
  redirect: { name: "productList" },
  meta: {
    requiresAuth: true,
    moduleid: 0,
  },
  children: [
    {
      path: "",
      name: "productList",
      component: ProductListView,
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
      component: ProductDetailView,
      meta: {
        requiresAuth: true,
        moduleid: 0,
        icon: "fa-solid fa-bars-staggered",
        title: "Visualizar Producto",
      },
    },
  ],
};
