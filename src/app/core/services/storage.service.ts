import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  saveAccessToken(token: string) {
    window.localStorage.setItem(Constants.ACCESS_TOKEN_KEY, token);
  }

  saveRefreshToken(token: string) {
    const val = {
      token,
      expiry: Date.now() + Constants.REFRESH_TOKEN_EXPIRY * 60 * 1000,
    };
    window.localStorage.setItem(
      Constants.REFRESH_TOKEN_KEY,
      JSON.stringify(val)
    );
  }

  getAccessToken() {
    return window.localStorage.getItem(Constants.ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    const val = window.localStorage.getItem(Constants.REFRESH_TOKEN_KEY);
    if (val) return JSON.parse(val);

    return {};
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();

    if (token) return true;

    return false;
  }
}
