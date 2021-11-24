import { Component, Inject, OnInit } from '@angular/core';
import { PhoneVerificationService } from '../../core/phone-verification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../core/snackbar.service';
import { SmartContractService } from '../../core/smart-contract.service';
import {AuthStore} from "../../core/auth/auth.store";
import {DialogService} from "../../core/dialog.service";
import {LoadingService} from "../../core/loading.service";

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit {
  step: number = 1;
  pin: number = 0;

  constructor(private verificationService: PhoneVerificationService,
              private snackbar: SnackbarService,
              private authStore: AuthStore,
              private smartContract: SmartContractService,
              private dialogRef: MatDialogRef<PhoneVerificationComponent>,
              private dialogService: DialogService,
              private loadingService: LoadingService,
              @Inject(MAT_DIALOG_DATA) private data: {tokenId: number, unitId: number}) {

  }

  ngOnInit(): void {
    this.smartContract.permissionSubject.subscribe(values => {
      console.log(values);
      if (values.to.toUpperCase() == this.authStore.account.toUpperCase()) {
        if (values.valid as boolean) {
          this.closeDialog();
          this.dialogService.openSuccess('Verification done', 'You can now claim your token');
        }
        else {
          this.closeDialog();
          this.dialogService.openSuccess('Verification failed', '');
        }
        this.loadingService.stopLoading();
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  nextStep() {
    this.step++;
  }

  sendSms() {
    this.loadingService.startLoading();
    this.verificationService.sendVerificationSms(this.data.tokenId, this.data.unitId).then(() => {
      this.snackbar.openSuccess('The sms has been sent');
      this.nextStep();
      this.loadingService.startLoading();
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger('An error as occur, please try again later');
      this.loadingService.stopLoading();
    });
  }

  verifyPin() {
    this.loadingService.startLoading();
    this.smartContract.requestPinVerification(this.data.tokenId, this.data.unitId, this.pin).then(() => {
      this.snackbar.openSuccess('Your claim request has been sent');
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger('An error as occur, please try again later');
    })
  }
}
