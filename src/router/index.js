import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/layouts/Base.vue";
import Cookies from "js-cookie";
import { useUserStore } from "../stores/user";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      requiresAuth: true,
      extendsLayout: BaseLayout,
    },
  },
  {
    path: "/workspaces",
    name: "WorkSpaces",
    component: () => import("@/views/WorkSpaces.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/board/:id",
    name: "board",
    component: () => import("@/views/Board.vue"),
    meta: {
    requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = Cookies.get("access_token");

  if (token) {
    await useUserStore().authUser();
  }

  if (to.name === "SignIn" || to.name === "SignUp") {
    if (token) {
      next({ name: "WorkSpaces" });
    } else {
      next();
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: "SignIn" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
