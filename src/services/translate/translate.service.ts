import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TranslateService {
  data: any = {};

  constructor(private _http: HttpClient) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `assets/languageFiles/${lang || "en"}.json`;
      this._http.get<{}>(langPath).subscribe(
        (translation) => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        (error) => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
  
  getTranslate(key: string) {
    return this.data[key];
  }
}
