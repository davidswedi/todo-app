import { Routes } from "@angular/router";
import { TodoService } from "./core/services/todo.service";
import { inject } from "@angular/core";

const routeConfig: Routes = [
  {
    title: "Login | Todo-App",
    path: "login",
    loadComponent: () => import("./components/auth/login.component"),
  },
  {
    title: "Register | Todo-App",
    path: "register",
    loadComponent: () => import("./components/auth/register.component"),
  },
  {
    title: "Todo| Todo-App",
    path: "todo",
    canActivate: [() => inject(TodoService).isLoggedIn()],
    loadComponent: () => import("./components/todo/todo.component"),
  },
  {
    path: "",
    redirectTo: "todo",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "todo",
    pathMatch: "full",
  },
];
export default routeConfig;
