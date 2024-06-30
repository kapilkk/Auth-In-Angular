import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  storage;

  constructor() {
    this.storage = window.localStorage;
  }

  saveAccessToken(token: string) {
    this.storage.setItem(Constants.ACCESS_TOKEN_KEY, token);
  }

  saveRefreshToken(token: string) {
    const val = {
      token,
      expiry: Date.now() + Constants.REFRESH_TOKEN_EXPIRY * 60 * 1000,
    };
    this.storage.setItem(Constants.REFRESH_TOKEN_KEY, JSON.stringify(val));
  }

  getAccessToken() {
    return this.storage.getItem(Constants.ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    const val = this.storage.getItem(Constants.REFRESH_TOKEN_KEY);
    if (val) return JSON.parse(val).token;

    return {};
  }

  clear() {
    this.storage.removeItem(Constants.ACCESS_TOKEN_KEY);
    this.storage.removeItem(Constants.REFRESH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();

    if (token) return true;

    return false;
  }
}
