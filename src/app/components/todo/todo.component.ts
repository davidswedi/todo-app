import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "../shared/toolbar.component";
import { TodoListComponent } from "./todo-list.component";
import { AddtodoComponent } from "./addtodo.component";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    AddtodoComponent,
    TodoListComponent,
  ],
  template: `
    <app-toolbar [isLogoutBtnShown]="true"></app-toolbar>
    <app-addtodo></app-addtodo>
    <app-todo-list></app-todo-list>
  `,
  styles: [],
})
export default class TodoComponent {}
