import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth/auth.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../core/snackbar.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<AuthComponent>,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  connect() {
    this.authService.connectMetamask().then(() => {
      this.closeDialog();
    }).catch(() => {
      this.snackbar.openDanger('An error as occur, please try again');
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
