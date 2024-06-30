import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { UserService } from "../../core/services/user.service";
import { IUser } from "../../core/models";
import { CommonModule } from "@angular/common";

@Component({
  selector: "aia-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  user: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res as IUser;
        this.userService.setUser(res as IUser);
      },
      error: (err) => {},
    });
  }

  //events
  onLogout() {
    this.authService.logout();
  }
}
