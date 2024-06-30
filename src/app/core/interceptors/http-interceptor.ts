import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, finalize, switchMap, throwError } from "rxjs";
import { StorageService } from "../services/storage.service";
import { AuthService } from "../services/auth.service";
import { CommonService } from "../services/common.service";

export function httpReqInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const commonService = inject(CommonService);

  const token = storageService.getAccessToken();
  const refreshToken = storageService.getRefreshToken();

  let reqWithHeader = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${token}`),
  });

  //console.log(new Date(1719755498));

  return next(reqWithHeader).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        !req.url.includes("auth/signin") &&
        error.status === 401
      ) {
        if (storageService.isLoggedIn()) {
          commonService.displayLoader();
          console.log("Fetching token using refresh token....");
          return authService.getTokenUsingRefreshToken(refreshToken).pipe(
            switchMap((res: any) => {
              storageService.saveAccessToken(res.token);

              reqWithHeader = req.clone({
                headers: req.headers.set(
                  "Authorization",
                  `Bearer ${res.token}`
                ),
              });

              return next(reqWithHeader);
            }),
            catchError((err) => {
              authService.logout();
              return throwError(() => error);
            }),
            finalize(() => commonService.hideLoader())
          );
        }
      }

      return throwError(() => error);
    })
  );
}
