import { AbstractControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'validationError',
})
export class ValidationErrorPipe implements PipeTransform {
    transform(control: any, fieldName: string = 'Field', message?: string): any {
        // Custom Error messages
        // Required Error
        if (control.hasError('required')) {
            if(message) {
                return message;
            } else {
                return `${fieldName} is required.`;
            }
        }

        // Email Error
        if (control.hasError('email')) {
            return `${fieldName} is not valid.`;
        }

        // Min Length Error
        if (control.hasError('minlength')) {
            return `${fieldName} length must be at least ${control.getError('minlength').requiredLength}`;
        }

        // Max Length Error
        if (control.hasError('maxlength')) {
            return `${fieldName} length must be less than ${control.getError('maxlength').requiredLength}`;
        }

        // // Confirm Password match
        // if (control.hasError('compare')) {
        //     let message = null;
        //     const error = control.getError('compare');
        //     switch (error.type) {
        //         case 'MATCH': {
        //             message = `${fieldName} do not match with ${error.field}`;
        //             break;
        //         }
        //         case 'LOWER': {
        //             message = `${fieldName} should be lower than ${error.field}`;
        //             break;
        //         }
        //         case 'HIGHER': {
        //             message = `${fieldName} should be higher than ${error.field}`;
        //             break;
        //         }
        //         default: {
        //             message = `Comparison failed with field ${error.field}`;
        //             break;
        //         }
        //     }
        //     return message;
        // }

        if(control.hasError('pattern')){
            if(fieldName.toLowerCase() === 'email')
                return `Enter a valid Email`;
            if(fieldName.toLowerCase() === 'url')
                return `${fieldName} is not a valid url.`;
            return `Enter a valid ${fieldName}`;
        }

    }

}
