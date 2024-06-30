import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { StorageService } from "../../../core/services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get usernameControl() {
    return this.signInForm.get("username");
  }

  get passwordControl() {
    return this.signInForm.get("password");
  }

  //events
  onSubmitForm() {
    if (this.signInForm.invalid) return;

    this.authService
      .login(this.signInForm.value.username, this.signInForm.value.password)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.storageService.saveAccessToken(res.token);
          this.storageService.saveRefreshToken(res.refreshToken);
          this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
