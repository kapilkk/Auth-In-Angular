import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { UserService } from "../../core/services/user.service";
import { IUser } from "../../core/models";
import { CommonModule } from "@angular/common";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "aia-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  currentUser: IUser;
  unsubscribe = new Subject<unknown>();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  initListeners() {
    this.userService.currentUser$.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.currentUser = res;
      },
      error: (err) => {},
    });
  }

  //events
  onLogout() {
    this.authService.logout();
  }
}
