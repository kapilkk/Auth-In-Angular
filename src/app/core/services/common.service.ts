import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private loaderSubj = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean> = this.loaderSubj.asObservable();

  constructor() {}

  displayLoader() {
    this.loaderSubj.next(true);
  }

  hideLoader() {
    this.loaderSubj.next(false);
  }
}
