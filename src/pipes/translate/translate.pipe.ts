import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'src/services/translate/translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private _translate: TranslateService) {}
  transform(key: any): any {
    return this._translate.data[key] || key;
  }

}
