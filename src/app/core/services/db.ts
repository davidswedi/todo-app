import Dexie, { Table } from "dexie";
import { User } from "../models/user.model";
import { Todo } from "../models/todo.model";

export class AngularTodoDb extends Dexie {
  users!: Table<User, string>;
  todos!: Table<Todo, string>;
  constructor() {
    super("AngularTodoDb");
    this.version(1).stores({
      users: "email,password",
      todos: "++id,title,description,done",
    });
  }
}
