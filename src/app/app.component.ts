import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
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
  isLoader: boolean;

  constructor(
    private commonService: CommonService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.loader$.subscribe((res) => {
      this.isLoader = res;
    });

    if (this.isLoggedIn) this.router.navigate(["/dashboard"]);
  }

  get isLoggedIn() {
    return this.storageService.isLoggedIn();
  }
}
