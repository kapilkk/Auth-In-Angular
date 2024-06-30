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
  selector: "aia-sign-in",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isError: boolean = false;
  errorMsg: string;

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
    this.isError = false;

    this.authService
      .login(this.signInForm.value.username, this.signInForm.value.password)
      .subscribe({
        next: (res: any) => {
          this.storageService.saveAccessToken(res.token);
          this.storageService.saveRefreshToken(res.refreshToken);
          this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          this.isError = true;
          this.errorMsg = err;
        },
      });
  }
}
