import { createRouter, createWebHistory } from "vue-router";
import AppCatalog from "../views/catalog";

const routes = [{ path: "/catalog/", component: AppCatalog, alias: "/" }];

export default createRouter({
  history: createWebHistory('/addProd/'),
  routes,
});
