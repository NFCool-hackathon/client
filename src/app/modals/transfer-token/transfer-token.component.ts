import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SmartContractService} from "../../core/smart-contract.service";
import {SnackbarService} from "../../core/snackbar.service";

@Component({
  selector: 'app-transfer-token',
  templateUrl: './transfer-token.component.html',
  styleUrls: ['./transfer-token.component.scss']
})
export class TransferTokenComponent implements OnInit {

  to: string = '';
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {tokenId: number, unitId: number},
              private dialogRef: MatDialogRef<TransferTokenComponent>,
              private smartContract: SmartContractService,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  transferToken() {
    this.loading = true;
    this.smartContract.transferTokenUnit(this.data.tokenId, this.data.unitId, this.to).then(() => {
      this.snackbar.openSuccess('The token ' + this.data.tokenId + '-' + this.data.unitId + ' has successfully been transfered');
      this.closeDialog();
      this.loading = false;
    }).catch(e => {
      console.error(e);
      this.snackbar.openDanger(e);
      this.closeDialog();
      this.loading = false;
    });
  }

}
