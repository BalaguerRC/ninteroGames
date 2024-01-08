import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

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
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: {
      isProtected: true
    }
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from) => {
      localStorage.removeItem("user_data");
      localStorage.removeItem("token");
      router.push("/");
    },
    meta: {
      isProtected: true
    }
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isProtected)) {
    axios.get(import.meta.env.VITE_API_ENDPOINT + "/validators/jwt", {
      headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
    })
    .then((res) => {
      if (res.status != 200 && !localStorage.getItem("user_data")) {
        next("/login")
      } else if (res.status == 200 && localStorage.getItem("user_data")) {
        next()
      }
    })
    .catch((err) => {
      console.log("Could not process validation.\n" + err)
      next("/login")
    })
  }
  else {
    next()
  }
})

export default router;
