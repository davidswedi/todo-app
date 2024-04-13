import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TodoService } from "src/app/core/services/todo.service";

@Component({
  selector: "app-toolbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="toolbar">
      <a class="app-title" routerLink="/">TodoApp</a>
      <button
        class="toolbar-btn"
        routerLink="/register"
        *ngIf="isLoginBtnShown"
      >
        S'inscrire
      </button>
      <button
        class="toolbar-btn"
        routerLink="/login"
        *ngIf="isRegisterBtnShown"
      >
        Se connecter
      </button>
      <div class="icon-btn" *ngIf="isLogoutBtnShown">
        <div class="icon">
          {{ avatar![0] | uppercase }}
        </div>
        <button class="toolbar-btn" routerLink="/login" (click)="logOut()">
          Se Deconnecter
        </button>
      </div>
    </nav>
  `,
  styles: [
    `
      .toolbar {
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        border-bottom: 0.1px solid black;
        position: sticky;
        top: 0;
      }
      .app-title {
        text-decoration: none;
        color: inherit;
        font-size: 1.4rem;
        font-weight: bold;
      }
      .toolbar-btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: #252525;
        color: white;
        font-size: 1.1rem;
        transition: transform 250ms;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
      .icon-btn {
        display: flex;
        align-items: center;
      }
      .icon {
        background: green;
        color: white;
        border-radius: 50%;
        padding: 1.2rem;
        width: 0.5rem;
        height: 0.5rem;
        margin: 0.2rem;
      }
    `,
  ],
})
export class ToolbarComponent {
  @Input() isLoginBtnShown?: boolean;
  @Input() isRegisterBtnShown?: boolean;
  @Input() isLogoutBtnShown?: boolean;

  avatar = localStorage.getItem("email");
  logOut = () => localStorage.removeItem("email");
}
