import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
}
