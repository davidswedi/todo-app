import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "../shared/toolbar.component";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { TodoService } from "src/app/core/services/todo.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule],
  template: ` <app-toolbar [isLoginBtnShown]="true"></app-toolbar>
    <form class="form-container" [formGroup]="loginForm">
      <h2 class="title">Connectez vous</h2>
      <h3 class="sub-title">
        Utilisez votre email <a routerLink="/register">email</a>
      </h3>
      <input type="email" formControlName="email" />
      <input type="password" formControlName="password" />
      <p *ngIf="showError">{{ errorMessage }}</p>
      <button
        class="btn-all"
        [disabled]="loginForm.invalid"
        (click)="onSubmit()"
        [ngClass]="{ 'active-btn': !loginForm.invalid }"
      >
        Se connecter
      </button>
    </form>`,
  styles: [
    `
      @use "../shared/form.style" as *;
      input {
        display: block;
      }
    `,
  ],
})
export default class LoginComponent {
  private ts = inject(TodoService);
  private router = inject(Router);
  showError = false;
  errorMessage = "Cet email n'est pas reconnu";
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });
  async onSubmit() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    const user = await this.ts.isLogIn(email);
    if (user?.email === email && user?.password === password) {
      localStorage.setItem("email", email);
      this.router.navigateByUrl("todo");
    } else {
      this.showError = true;
    }
  }
}
