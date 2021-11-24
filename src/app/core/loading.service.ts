import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoadingComponent} from "../modals/loading/loading.component";
import {MatDialogRef} from "@angular/material/dialog/dialog-ref";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private modal: MatDialogRef<LoadingComponent> | undefined;

  constructor(private dialog: MatDialog) { }

  public startLoading() {
    this.modal = this.dialog.open(LoadingComponent, {disableClose: true});
  }

  public stopLoading() {
    if (this.modal) {
      this.modal.close();
    }
  }
}
