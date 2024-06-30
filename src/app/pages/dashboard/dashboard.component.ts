import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {},
    });
  }
}
