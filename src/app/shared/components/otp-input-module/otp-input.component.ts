import { Component, EventEmitter, HostListener, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent {
  public boxes: {value:string}[] = [];
  public otpForm!: FormGroup;
  public otpValues: String = '';
  @Input() cls:string = '';
  @Input() parentClass:string = '';
  @Input() length: number = 4;
  @Input() isNumeric: boolean = true;
  @Output() onOtpChange = new EventEmitter<any>();
  @ViewChildren('dynamicInputRef') dynamicInputRef!: QueryList<any>

  constructor() { }

  ngOnInit() {
    this.boxes = Array(this.length).fill('');
    this.createForm();
    this.onFormValueChange();
  }

  createForm(){
    this.otpForm = new FormGroup({})
    for (let index = 0; index < this.length; index++) {
      this.otpForm.addControl(this.getControlName(index), new FormControl());
    }
  }

  onFormValueChange(){
    this.otpForm.valueChanges.subscribe((values) => {
      const otpValue = Object.values(values).join('');
      this.otpValues = otpValue;
      this.onOtpChange.emit(this.otpValues)
    });
  }

  get inputType() {
    return this.isNumeric
      ? 'tel'
      : 'text';
  }

  getControlName(index: number) {
    return `otp-box-${index}`
  }

  validateNumericInput(event: KeyboardEvent) {
    return !isNaN(+event.key);
  }


  handleInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value) {
      const nextIndex = index + 1;
      if (nextIndex < this.boxes.length) {
        const nextInput = document.getElementById(`otp-box-${nextIndex}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        const prevInput = document.getElementById(`otp-box-${prevIndex}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }

  handleBackspace(event: any, index: number) {
    event.preventDefault();
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      const prevInput: any = document.getElementById(`otp-box-${prevIndex}`);
      const currentInput: any = document.getElementById(`otp-box-${index}`);
      if (prevInput) {
        prevInput.focus();
        currentInput.value = '';
        this.otpForm.get(`otp-box-${index}`)?.setValue('')
      }
    } else {
      const currentInput: any = document.getElementById(`otp-box-${index}`)
      if (currentInput) {
        currentInput.value = ''
        this.otpForm.get(`otp-box-${index}`)?.setValue('')
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleHostKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const lastFilledIndex = this.boxes.slice().reverse().findIndex((box) => box);
      const indexToFocus = this.boxes.length - lastFilledIndex;
      const inputToFocus: any = document.getElementById(`otp-box-${indexToFocus}`);
      if (inputToFocus) {
        inputToFocus.focus();
        inputToFocus.value = '';
        this.otpForm.get(`otp-box-${indexToFocus}`)?.setValue('')
      }
    }
  }



}