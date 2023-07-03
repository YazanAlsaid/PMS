import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackPopupService {

  private readonly snackbarConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top'
  };

  constructor(private snackBar: MatSnackBar) {
  }

  public open(message: string): void {
    this.snackBar.open(message, 'ok', this.snackbarConfig);
  }
}
