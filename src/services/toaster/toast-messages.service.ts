import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Method to show the error message to the user 
   * @param infoMessage deatiled message
   */
  toast(infoMessage: string,panelClass:string) {
    this._snackBar.open(infoMessage,'',{
      panelClass:[panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}
