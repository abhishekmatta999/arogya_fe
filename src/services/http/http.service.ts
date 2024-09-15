import { APP_ID, Inject, Injectable, inject } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { LoaderService } from "../../app/shared/components/loader/services/loader.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private _http: HttpClient,
    private _loaderService: LoaderService,
    @Inject("API_URL") public _apiUrl: string
  ) {}

  post<T>(
    url: string,
    data: any,
    options?: any,
    loader = true
  ): Observable<any> {
    if (loader) {
      this._loaderService.show();
    }
    return this._http.post(this._apiUrl + url, data, options);
  }

  put<T>(url: string, data?: any, loader = true): Observable<any> {
    if (loader) {
      this._loaderService.show();
    }
    return this._http.put(this._apiUrl + url, data);
  }

  delete<T>(url: string, query?: any, loader = true): Observable<any> {
    if (loader) {
      this._loaderService.show();
    }
    return this._http.delete(this._apiUrl + url, { params: query });
  }

  patch<T>(
    url: string,
    data: any,
    option?: any,
    loader = true
  ): Observable<any> {
    if (loader) {
      this._loaderService.show();
    }
    return this._http.patch(this._apiUrl + url, data, { params: option });
  }

  get<T>(url: string, httpParams?: any, loader = true): Observable<any> {
    if (loader) {
      this._loaderService.show();
    }
    return this._http.get(this._apiUrl + url, { params: httpParams });
  }
}
