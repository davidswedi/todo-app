import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "../shared/toolbar.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { TodoService } from "src/app/core/services/todo.service";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ToolbarComponent, RouterModule, ReactiveFormsModule],
  template: `<app-toolbar [isRegisterBtnShown]="true"></app-toolbar>
    <form class="form-container" [formGroup]="registerForm">
      <h2 class="title">Connectez vous</h2>
      <h3 class="sub-title">
        Utilisez votre emainm <a routerLink="/register">email</a>
      </h3>
      <input type="email" formControlName="email" />
      <input type="password" formControlName="password" />
      <p *ngIf="showError">{{ errorMessage }}</p>
      <button
        class="btn-all"
        [disabled]="registerForm.invalid"
        (click)="onSubmit()"
      >
        S'inscrire
      </button>
    </form> `,
  styles: [
    `
      input {
        display: block;
      }
    `,
  ],
})
export default class RegisterComponent {
  showError = false;
  private ts = inject(TodoService);
  private router = inject(Router);
  errorMessage = "Cet email n'est pas reconnu";
  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  async onSubmit() {
    const user: User = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
    localStorage.setItem("email", user.email);
    await this.ts.addUser(user);
    this.router.navigateByUrl("/todo");
  }
}
