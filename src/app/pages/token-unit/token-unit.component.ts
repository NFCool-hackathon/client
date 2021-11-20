import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createInitialTokenModel, TokenModel } from '../../models/token.model';
import { createInitialUnitModel, UnitModel } from '../../models/unit.model';
import { SmartContractService } from '../../core/smart-contract.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../core/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PhoneVerificationComponent } from '../../modals/phone-verification/phone-verification.component';

@Component({
  selector: 'app-token-unit',
  templateUrl: './token-unit.component.html',
  styleUrls: ['./token-unit.component.scss']
})
export class TokenUnitComponent implements OnInit {
  tokenId: number = 0;
  unitId: number = 0;

  contractAddress = environment.contractAddress;

  token: TokenModel = createInitialTokenModel();
  unit: UnitModel = createInitialUnitModel();

  constructor(private route: ActivatedRoute,
              private smartContract: SmartContractService,
              private snackbar: SnackbarService,
              private dialog: MatDialog) { }

  ngOnInit() {
    const tmpTokenId: string | null = this.route.snapshot.paramMap.get('tokenId');
    const tmpUnitId: string | null = this.route.snapshot.paramMap.get('unitId');
    if (tmpTokenId && tmpUnitId) {
      this.tokenId = parseInt(tmpTokenId, 10);
      this.unitId = parseInt(tmpUnitId, 10);
    }
    this.initTokens();
  }

  initTokens() {
    this.smartContract.getToken(this.tokenId).then(res => {
      this.token = res as TokenModel;
      console.log(this.token);
    })
      .catch(e => {
        console.error(e);
        this.snackbar.openDanger('An error as occur, please try again later.');
      });

    this.smartContract.getTokenUnit(this.tokenId, this.unitId).then(res => {
      this.unit = res as UnitModel;
      console.log(this.unit);
    })
      .catch(e => {
        console.error(e);
        this.snackbar.openDanger('An error as occur, please try again later.');
      });
  }

  async claimOwnership() {
    const havePermission: boolean = await this.smartContract.havePermission(this.tokenId, this.unitId);
    if (havePermission) {
      this.smartContract.claimUnitOwnership(this.tokenId, this.unitId)
        .then(() => {
          this.initTokens();
          this.snackbar.openSuccess("You successfully received ownership of the token");
        })
        .catch(e => {
          this.snackbar.openDanger("An error has occur, please try again later");
          console.error(e);
        });
    }
    else {
      this.openModal();
    }
  }

  openModal() {
    this.dialog.open(PhoneVerificationComponent, { data: { tokenId: this.tokenId, unitId: this.unitId } });
  }
}
