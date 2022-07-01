import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar) {}

  openInfoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-style'],
    });
    this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {});
  }
  openErrorSnackBar(errorMessage: string, action: string) {
    this.snackBar.open(errorMessage, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-error-style'],
    });
  }

  openSnackBar(message: string, action: string, data: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-style'],
    });
    this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
      window.open('https://ropsten.etherscan.io/tx/' + data, '_blank');
    });
  }
}
