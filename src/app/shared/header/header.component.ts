import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { Subject, takeUntil } from "rxjs";
import { IUser } from "../../core/models";
import { CommonModule } from "@angular/common";

@Component({
  selector: "aia-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  unsubscribe = new Subject<unknown>();
  currentUser: IUser;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res) => {
        this.currentUser = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
