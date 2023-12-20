import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "view",
    component: () => import("@/views/View.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
