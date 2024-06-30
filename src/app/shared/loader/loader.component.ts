import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "aia-loader",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loader.component.html",
  styleUrl: "./loader.component.scss",
})
export class LoaderComponent {}
