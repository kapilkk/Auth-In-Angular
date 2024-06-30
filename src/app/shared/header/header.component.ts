import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { Subject, takeUntil } from "rxjs";
import { IUser } from "../../core/models";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { StorageService } from "../../core/services/storage.service";

@Component({
  selector: "aia-header",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: IUser;
  unsubscribe = new Subject<unknown>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initListeners();
    this.isLoggedIn && this.getUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  get isLoggedIn() {
    return this.storageService.isLoggedIn();
  }

  initListeners() {
    this.userService.currentUser$.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.currentUser = res;
      },
      error: (err) => {},
    });
  }

  getUser() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        this.currentUser = res as IUser;
        this.userService.setUser(res as IUser);
      },
      error: (err) => {},
    });
  }
}
