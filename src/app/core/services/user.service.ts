import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants/constants";
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../models";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  private currentUserSubj = new BehaviorSubject<IUser>(null);
  currentUser$: Observable<IUser> = this.currentUserSubj.asObservable();

  setUser(user: IUser) {
    this.currentUserSubj.next(user);
  }
}
