import { Component } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { IUserDetail } from "../../core/models/userDetail";
import { CommonModule } from "@angular/common";
import { IDataDisplay } from "../../core/models/dataDisplay";

@Component({
  selector: "aia-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
  userDetails: IUserDetail;

  userInfo: IDataDisplay[] = [
    {
      label: "Image",
      property: "image",
      value: "",
    },
    {
      label: "Username",
      property: "username",
      value: "",
    },
    {
      label: "Fullname",
      property: "fullName",
      value: "",
    },
    {
      label: "Email",
      property: "email",
      value: "",
    },
    {
      label: "Gender",
      property: "gender",
      value: "",
    },
    {
      label: "Phone",
      property: "phone",
      value: "",
    },
    {
      label: "Role",
      property: "role",
      value: "",
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getCurrentUser().subscribe({
      next: (res) => {
        this.userDetails = {
          username: res.username,
          fullName: `${res.firstName} ${res.maidenName} ${res.lastName}`,
          email: res.email,
          gender: res.gender,
          phone: res.phone,
          image: res.image,
          role: res.role,
        } as IUserDetail;

        this.mapUserInfo(this.userDetails);
      },
      error: (err) => {},
    });
  }

  mapUserInfo(user: IUserDetail) {
    this.userInfo.forEach(
      (ui) => (ui.value = user[ui.property as keyof IUserDetail].toString())
    );
  }
}
