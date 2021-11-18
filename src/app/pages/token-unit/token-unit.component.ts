import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {createInitialTokenModel, TokenModel} from "../../models/token.model";
import {createInitialUnitModel, UnitModel} from "../../models/unit.model";
import {SmartContractService} from "../../core/smart-contract.service";
import { ActivatedRoute } from '@angular/router';
import {SnackbarService} from "../../core/snackbar.service";

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
              private smartcontract: SmartContractService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
    const tmpTokenId: string | null = this.route.snapshot.paramMap.get('tokenId');
    const tmpUnitId: string | null = this.route.snapshot.paramMap.get('unitId');
    if (tmpTokenId && tmpUnitId) {
      this.tokenId = parseInt(tmpTokenId, 10);
      this.unitId = parseInt(tmpUnitId, 10);
    }

    this.smartcontract.getToken(this.tokenId).then(res => {
      this.token = res as TokenModel;
      console.log(this.token);
    })
      .catch(e => {
        console.error(e);
        this.snackbar.openDanger('An error as occur, please try again later.');
      });

    this.smartcontract.getTokenUnit(this.tokenId, this.unitId).then(res => {
      this.unit = res as UnitModel;
      console.log(this.unit);
    })
      .catch(e => {
        console.error(e);
        this.snackbar.openDanger('An error as occur, please try again later.');
      });
  }
}
