import { Directive,ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _control: NgControl,
    ) { }

  @HostListener("blur") onBlur() { 
    const abstractControl:any = this._control.control;
    let value = abstractControl.value;
    if(value) {
      if(this._elementRef.nativeElement.id!=='pass')  value = value.trim();
      this._renderer.setProperty(this._elementRef.nativeElement, "value", value); 
    } else   this._renderer.setProperty(this._elementRef.nativeElement, "value", '');  
  }

}