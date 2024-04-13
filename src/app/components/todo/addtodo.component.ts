import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TodoService } from "src/app/core/services/todo.service";
import { Todo } from "src/app/core/models/todo.model";

@Component({
  selector: "app-addtodo",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="form-container" [formGroup]="addTodo">
      <input
        type="text"
        name="title"
        formControlName="title"
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        formControlName="description"
        placeholder="Description"
      />
      <button
        class="btn"
        [ngClass]="{ 'active-btn': !addTodo.invalid }"
        [disabled]="addTodo.invalid"
        (click)="onSubmit()"
      >
        Add ToDo
      </button>
    </form>
  `,
  styles: [
    `
      .form-container {
        border: none;
      }
      input {
        margin: 0.5rem;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 1.1rem;
      }
    `,
  ],
})
export class AddtodoComponent {
  private ts = inject(TodoService);
  addTodo = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl(""),
  });

  onSubmit() {
    const todo: Todo = {
      title: this.addTodo.value.title!,
      description: this.addTodo.value.description!,
      done: false,
    };
    this.ts.newTodo(todo);
    this.addTodo.reset();
  }
}
