import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoService } from "src/app/core/services/todo.service";
import { Todo } from "src/app/core/models/todo.model";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="desc-container" *ngFor="let todo of todos | async">
      <div class="todo-content">
        <input
          type="checkbox"
          name="done"
          [checked]="todo.done"
          (click)="updateTodo(todo)"
        />
        <div class="title-desc" [ngClass]="{ done: todo.done }">
          <h3 class="title">{{ todo.title }}</h3>
          <p class="description">{{ todo.description }}</p>
        </div>
      </div>

      <button class="delete-btn" (click)="deleteTodo(todo)">Supprimer</button>
    </div>
  `,
  styles: [
    `
      .desc-container {
        display: flex;
        justify-content: space-between;
        width: clamp(80%, 5vw, 90%);
        max-width: 1200px;
        margin: 1rem auto;
        align-items: center;
        border-radius: 8px;
        border: 1px #2828281a solid;
        padding: 1rem;
      }
      .todo-content {
        display: flex;
      }
      .title-desc {
        margin: 0.2rem;
        font-weight: normal;
      }
      input {
        width: 20px;
        margin-right: 1rem;
      }
      .done {
        text-decoration: line-through;
      }
      .delete-btn {
        padding: 0.4rem;
        background: red;
        color: white;
        border: none;
        font-weight: 1rem;
        border-radius: 8px;
      }
    `,
  ],
})
export class TodoListComponent {
  private ts = inject(TodoService);
  readonly todos = this.ts.getTodo();
  updateTodo(todo: Todo) {
    todo.done = !todo.done;
    this.ts.updateTodo(todo);
  }
  deleteTodo = (todo: Todo) => this.ts.deleteTodo(todo);
}
