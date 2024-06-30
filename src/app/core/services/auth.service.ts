import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";
import { catchError, throwError } from "rxjs";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    const body = JSON.stringify({
      username,
      password,
      expiresInMins: Constants.REFRESH_TOKEN_EXPIRY,
    });

    return this.http
      .post(Constants.API_URL + "auth/login", body, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            //connection lost
          }

          return throwError(() => new Error(error.error.message));
        })
      );
  }

  logout() {
    this.storageService.clear();
    this.userService.setUser(null);
    this.router.navigate(["/sign-in"]);
  }

  getTokenUsingRefreshToken(token: string) {
    const body = JSON.stringify({
      refreshToken: token,
      expiresInMins: Constants.REFRESH_TOKEN_EXPIRY,
    });

    return this.http
      .post(Constants.API_URL + "auth/refresh", body, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            //connection lost
          }

          return throwError(() => new Error(error.error.message));
        })
      );
  }

  getCurrentUser() {
    return this.http.get(Constants.API_URL + "auth/me").pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          //connection lost
        }

        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
