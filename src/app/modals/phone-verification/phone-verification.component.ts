import { Component, Inject, OnInit } from '@angular/core';
import { PhoneVerificationService } from '../../core/phone-verification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../core/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';
import { SmartContractService } from '../../core/smart-contract.service';
import {AuthStore} from "../../core/auth/auth.store";
import {DialogService} from "../../core/dialog.service";

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit {
  step: number = 0;
  pin: number = 0;

  loading: boolean = false;

  constructor(private verificationService: PhoneVerificationService,
              private snackbar: SnackbarService,
              private authService: AuthService,
              private authStore: AuthStore,
              private smartContract: SmartContractService,
              private dialogRef: MatDialogRef<PhoneVerificationComponent>,
              private dialogService: DialogService,
              @Inject(MAT_DIALOG_DATA) private data: {tokenId: number, unitId: number}) {

  }

  ngOnInit(): void {
    if (this.authService.isAuth) {
      this.nextStep();
    }

    this.smartContract.permissionSubject.subscribe(values => {
      console.log('In perm sub');
      console.log(values);
      if (values.to == this.authStore.account && this.loading) {
        if (values.valid as boolean) {
          this.closeDialog();
          this.dialogService.openSuccess('Verification done', 'You can now claim your token');
        }
        else {
          this.closeDialog();
          this.dialogService.openSuccess('Verification failed', '');
        }
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  connect() {
    this.authService.connectMetamask().then(() => {
      this.nextStep()
    }).catch(() => {
      this.snackbar.openDanger('An error as occur, please try again');
    });
  }

  nextStep() {
    this.step++;
  }

  sendSms() {
    this.loading = true;

    this.verificationService.sendVerificationSms(this.data.tokenId, this.data.unitId).then(() => {
      this.snackbar.openSuccess('The sms has been sent');
      this.nextStep();
      this.loading = false;
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger('An error as occur, please try again later');
      this.loading = false;
    });
  }

  verifyPin() {
    this.loading = true;
    this.smartContract.requestPinVerification(this.data.tokenId, this.data.unitId, this.pin).then(() => {
      this.snackbar.openSuccess('Your claim request has been sent');
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger('An error as occur, please try again later');
    })
  }
}
