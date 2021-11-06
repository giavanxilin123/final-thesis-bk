import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
  {
    path: "/berries",
    component: () => import("../views/products/Berries.vue"),
  },
  {
    path: "/cereals",
    component: () => import("../views/products/Cereals.vue"),
  },
  {
    path: "/milk",
    component: () => import("../views/products/Milk.vue"),
  },
  {
    path: "/nuts",
    component: () => import("../views/products/Nuts.vue"),
  },
  {
    path: "/vegetables",
    component: () => import("../views/products/Vegetables.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/history",
    component: () => import("../views/history"),
  },
  {
    path: "/history/product-list",
    component: () => import("../views/history/ProductList.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('cus_accessToken')
  let requiredAuth = ['/history', ['/order']] 
  // add route to requiredAuth
  if (!token && requiredAuth.find((r) => to.path.includes(r))) {
    next('/')
  } else {
    next()
  }
})

export default router;