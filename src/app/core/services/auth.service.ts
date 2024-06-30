import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";
import { catchError, finalize, throwError } from "rxjs";
import { StorageService } from "./storage.service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { CommonService } from "./common.service";
import { IUser } from "../models";

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
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private commonService: CommonService
  ) {}

  login(username: string, password: string) {
    this.commonService.displayLoader();

    const body = JSON.stringify({
      username,
      password,
      expiresInMins: Constants.REFRESH_TOKEN_EXPIRY,
    });

    return this.http
      .post(Constants.API_URL + "auth/login", body, httpOptions)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.commonService.hideLoader())
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
      .pipe(catchError(this.handleError));
  }

  getCurrentUser() {
    this.commonService.displayLoader();

    return this.http.get<IUser>(Constants.API_URL + "auth/me").pipe(
      catchError(this.handleError),
      finalize(() => this.commonService.hideLoader())
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      //connection lost
    }

    return throwError(() => new Error(error.error.message));
  }
}
