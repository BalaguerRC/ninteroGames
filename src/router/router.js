import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

const dataUser = JSON.parse(localStorage.getItem("user_data"));
const routes = [
  {
    path: "/",
    component: () => import("@/views/View.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "search",
        component: () => import("@/views/Search.vue"),
        children: [
          {
            path: ":name",
            component: () => import("@/views/Search.vue"),
          },
        ],
      },
      {
        path: "game",
        children: [
          {
            path: "create",
            component: () => import("@/views/PublishGame.vue"),
          },
          {
            path: ":id",
            component: () => import("@/views/GameItem.vue"),
          },
          {
            path: "update/:id",
            component: () => import("@/views/PublishGame.vue"),
          },
        ],
      },
      {
        path: "profile",
        name: "profile",
        children: [
          {
            path: "",
            component: () => import("@/views/auth/Profile.vue"),
            meta: {
              isProtected: true,
            },
          },
          {
            path: ":id",
            component: () => import("@/views/Profile/ProfileUser.vue"),
          },
        ],
      },
      {
        path: "about",
        component: () => import("@/views/About.vue"),
      },
      {
        path: "settings",
        //name: "settings",
        component: () => import("@/views/auth/Settings.vue"),
        meta: {
          isProtected: true,
        },
      },
      {
        path: "/news",
        component: () => import("@/views/News.vue"),
      },
      {
        path: "/news/:articleid",
        component: () => import("@/views/Article.vue"),
      },
      {
        path: "/news/create",
        component: () => import("@/views/WriteArticle.vue"),
      },
      {
        path: "/news/update/:articleid",
        component: () => import("@/views/UpdateArticle.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/auth/Register.vue"),
  },
  //test children and params
  {
    path: "/test",
    name: "test",
    children: [
      {
        path: "",
        component: () => import("@/views/test/TestView.vue"),
      },
      {
        path: ":id",
        component: () => import("@/views/test/TestTexto.vue"),
      },
    ],
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
      isProtected: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isProtected)) {
    if (localStorage.getItem("token")) {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + "/validators/jwt", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (res.status != 200) {
            localStorage.removeItem("token");
            next("/login");
          } else if (res.status == 200 && localStorage.getItem("user_data")) {
            next();
          } else {
            next("/login");
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("user_data");
          console.log("Could not process validation.\n" + err);
          next("/login");
        });
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
