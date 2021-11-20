import { Component, Inject, OnInit } from '@angular/core';
import { PhoneVerificationService } from '../../core/phone-verification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../core/snackbar.service';
import { AuthService } from '../../core/auth/auth.service';
import { SmartContractService } from '../../core/smart-contract.service';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit {
  step: number = 0;
  pin: number = 0;

  constructor(private verificationService: PhoneVerificationService,
              private snackbar: SnackbarService,
              private authService: AuthService,
              private smartContract: SmartContractService,
              private dialogRef: MatDialogRef<PhoneVerificationComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {tokenId: number, unitId: number}) { }

  ngOnInit(): void {
    if (this.authService.isAuth) {
      this.nextStep();
    }
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
    this.verificationService.sendVerificationSms(this.data.tokenId, this.data.unitId).then(() => {
      this.snackbar.openSuccess('The sms has been sent');
      this.nextStep();
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger('An error as occur, please try again later');
    });
  }

  verifyPin() {
    this.smartContract.requestPinVerification(this.data.tokenId, this.data.unitId, this.pin).then(() => {
      this.snackbar.openSuccess('Your claim request has been sent');
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger('An error as occur, please try again later');
    })
  }
}
