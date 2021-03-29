import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Money from "@/views/Money.vue";
import Labels from "@/views/Label.vue";
import Statistic from "@/views/Statistic.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/money",
  },
  {
    path: "/money",
    name: "Money",
    component: Money,
  },
  {
    path: "/labels",
    name: "Labels",
    component: Labels,
  },
  {
    path: "/statistic",
    name: "Statistic",
    component: Statistic,
  },
  {
    path: "/labels/edit/:id",
    name: "EditLabel",
    component: EditLabel,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
