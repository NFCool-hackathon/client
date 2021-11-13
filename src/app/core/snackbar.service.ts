import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) { }

  openSuccess(msg: string): void {
    this.snackbar.open(msg, undefined, { duration: 3000 });
  }

  openDanger(msg: string): void {
    this.snackbar.open(msg, undefined, { duration: 4000 });
  }
}
