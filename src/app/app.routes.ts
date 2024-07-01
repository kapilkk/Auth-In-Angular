import { Routes } from "@angular/router";
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "sign-in",
    title: "Sign In",
    component: SignInComponent,
  },
  {
    path: "dashboard",
    title: "Dashboard",
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: "profile",
    title: "Profile",
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "sign-in",
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "sign-in",
  },
];
