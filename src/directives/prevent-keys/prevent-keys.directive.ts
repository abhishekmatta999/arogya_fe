import {
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { regexList } from 'src/app/shared/constants/constants';

@Directive({
  selector: 'input[appPreventKeys]',
})
export class PreventKeysDirective {
  constructor(private _el: ElementRef, private ngControl: NgControl) {}
  @Input() type: string = '';
  @Input() maxlength!: number;

  private previousValue = '';
  private element = <HTMLInputElement>this._el.nativeElement;
  private regex = this.getRegex(this.element.type);

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    let currValue = this.element.value;
    this.regex = this.regex || this.getRegex(this.type);
    const inputtedValue:any = this.getLastTypedKey(currValue);

    // Ignoring in case of any element is deleted
    if (this.previousValue.length > this.element.value.length) {
      this.previousValue = this.element.value;
      return;
    }

    // Checking if pasted data needs to be added based on regex test
    if (inputtedValue?.length > 1) {
      if (!this.regex.test(inputtedValue)) {
        currValue = currValue.slice(inputtedValue.length);
        (<any>this.ngControl)['control']?.setValue(currValue);
      }

      this.previousValue = currValue;
      return;
    }

    // Checking max length condition and filtering final string
    if (this.element.value.length > this.maxlength) {
      currValue = this.element.value.slice(this.maxlength);
    }

    if (this.regex) {
      const isValid = this.regex.test(currValue);
      if (!isValid) {
        currValue = currValue?.slice(0, -1);
      }

      (<any>this.ngControl)['control']?.setValue(currValue);
    }

    this.previousValue = currValue;
  }

  /**
   * Method to filter out pasted data out of control value
   * @param currentValue - Full control value out of which pasted data needs to be filtered
   * @returns - Pasted data
   */
  private getLastTypedKey(currentValue: string): string | null {
    if (currentValue.length > this.previousValue.length) {
      // Return the newly added characters
      return currentValue.slice(this.previousValue.length);
    }
    return null;
  }

  /**
   * Method to check the regex based on the input type
   * @param type - input type for which regex need to be checked
   * @returns - regex string
   */
  private getRegex(type: string) {
    switch (type) {
      case 'numeric': {
        return regexList.numericString;
      }
      case 'alphabet': {
        return regexList.alphabetString;
      }
      case 'alphanumeric': {
        return regexList.alphabhetAndNumberOnlyWithSpace;
      }
      case 'mobile': {
        return /^[6-9][0-9]*$/;
      }
      default:
        return new RegExp('')
    }
  }
}
