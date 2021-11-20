import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DisplayDangerComponent} from "../modals/display-danger/display-danger.component";
import {DisplaySuccessComponent} from "../modals/display-success/display-success.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openDanger(title: string, content: string): void {
    this.dialog.open(DisplayDangerComponent, {data: {title, content}});
  }

  public openSuccess(title: string, content: string): void {
    this.dialog.open(DisplaySuccessComponent, {data: {title, content}});
  }
}
