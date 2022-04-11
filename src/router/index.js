import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Lesson from "../views/Lesson.vue";
import Lessons from "../views/Lessons.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ttsTest",
    name: "ttsTest",
    component: () => import("../views/TTSTest.vue"),
  },
  {
    path: "/lesson/:bookName/:startPage/:endPage",
    name: "Lesson",
    component: Lesson,
  },
  {
    path: "/lessons/:bookName/",
    name: "Lessons",
    component: Lessons,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
