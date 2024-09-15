import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { map, catchError, finalize, retry } from "rxjs/operators";
import { ToastMessagesService } from "../toaster/toast-messages.service";
import { INTERNAL_SERVER_ERROR } from "../../app/shared/constants/constants";
import { LoaderService } from "../../app/shared/components/loader/services/loader.service";
import { ACCOUNT, LOGIN } from "src/app/shared/constants/routes-constant";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  retryAttempts: number = 2;

  constructor(
    private _route: Router,
    private _auth: AuthService,
    private _toast: ToastMessagesService,
    private _loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req.clone({ setHeaders: this._auth.authorization() });

    return next.handle(authReq).pipe(
      retry(this.retryAttempts),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._loaderService.hide();
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorState(error);
        if (error?.error?.code === 401) {
          localStorage.removeItem("userInfo");
          this._route.navigate([`${ACCOUNT}/${LOGIN}`]);
        }
        return throwError(error.error ? error.error : error);
      }),

      finalize(() => {
        this._loaderService.hide();
      })
    );
  }

  errorState(error: any) {
    this._loaderService.hide();
    if (error.status == 0) {
      if (!navigator.onLine) {
        this._toast.toast(INTERNAL_SERVER_ERROR, "error-toast");
      } else {
        this._toast.toast(INTERNAL_SERVER_ERROR, "error-toast");
      }
    } else {
      this._toast.toast(error?.error?.message, "error-toast");
    }
  }
}
