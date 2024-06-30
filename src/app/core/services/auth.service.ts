import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";
import { catchError, throwError } from "rxjs";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = JSON.stringify({
      username,
      password,
      expiresInMins: 1,
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
