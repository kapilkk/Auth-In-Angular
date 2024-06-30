import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/header/header.component";
import { LoaderComponent } from "./shared/loader/loader.component";
import { CommonService } from "./core/services/common.service";
import { CommonModule } from "@angular/common";
import { StorageService } from "./core/services/storage.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoaderComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "Auth-In-Angular";
  isLoader: boolean;

  constructor(
    private commonService: CommonService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.commonService.loader$.subscribe((res) => {
      this.isLoader = res;
    });
  }

  get isLoggedIn() {
    return this.storageService.isLoggedIn();
  }
}
