import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SmartContractService} from "../../core/smart-contract.service";
import {SnackbarService} from "../../core/snackbar.service";
import {LoadingService} from "../../core/loading.service";

@Component({
  selector: 'app-transfer-token',
  templateUrl: './transfer-token.component.html',
  styleUrls: ['./transfer-token.component.scss']
})
export class TransferTokenComponent implements OnInit {

  to: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {tokenId: number, unitId: number},
              private dialogRef: MatDialogRef<TransferTokenComponent>,
              private smartContract: SmartContractService,
              private snackbar: SnackbarService,
              private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  transferToken() {
    this.loadingService.startLoading();
    this.smartContract.transferTokenUnit(this.data.tokenId, this.data.unitId, this.to).then(() => {
      this.snackbar.openSuccess('The token ' + this.data.tokenId + '-' + this.data.unitId + ' has successfully been transfered');
      this.closeDialog();
      this.loadingService.stopLoading();
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger(e);
      this.closeDialog();
      this.loadingService.stopLoading();
    });
  }

}
