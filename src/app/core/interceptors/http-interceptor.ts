import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

export function httpReqInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const storageService = inject(StorageService);
  const token = storageService.getAccessToken();

  const reqWithHeader = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token}`),
  });

  return next(reqWithHeader);
}
