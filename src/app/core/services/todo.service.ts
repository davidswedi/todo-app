import { Injectable, inject } from "@angular/core";
import { AngularTodoDb } from "./db";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { Todo } from "../models/todo.model";
import { liveQuery } from "dexie";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private router = inject(Router);
  db = new AngularTodoDb();
  isLogIn = (email: string) => this.db.users.get(email);
  addUser = (user: User) => this.db.users.add(user);
  getUser = () => this.db.users.toArray();
  isLoggedIn() {
    if (localStorage.getItem("email")) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
  newTodo = (todo: Todo) => this.db.todos.add(todo);
  getTodo = () => liveQuery(() => this.db.todos.toArray());
  updateTodo = (todo: Todo) => this.db.todos.update(todo.id!, todo);
  deleteTodo = (todo: Todo) => this.db.todos.delete(todo.id!);
}
