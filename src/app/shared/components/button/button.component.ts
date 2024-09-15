import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BUTTONUIMODEL } from '../../constants/button-config-constant';

@Component({
  selector: 'fit-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  @Output() Click = new EventEmitter();
  @Input() buttonConfig!:BUTTONUIMODEL;
  @Input() cls!: string;
  @Input() disabled: boolean = false;
  @Input() type!: string;

  onClick(){
    this.Click.emit(true);
  }
  
}
