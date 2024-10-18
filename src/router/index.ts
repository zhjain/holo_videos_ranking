import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import NotFound from "@/views/404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
