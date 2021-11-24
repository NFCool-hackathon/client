import {Component, OnDestroy, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import { createInitialTokenModel, TokenModel } from '../../models/token.model';
import { createInitialUnitModel, UnitModel } from '../../models/unit.model';
import { SmartContractService } from '../../core/smart-contract.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../core/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PhoneVerificationComponent } from '../../modals/phone-verification/phone-verification.component';
import {AuthStore} from "../../core/auth/auth.store";
import {AuthComponent} from "../../modals/auth/auth.component";
import {Subscription} from "rxjs";
import {TransferTokenComponent} from "../../modals/transfer-token/transfer-token.component";
import {AuthService} from "../../core/auth/auth.service";
import {LoadingService} from "../../core/loading.service";

@Component({
  selector: 'app-token-unit',
  templateUrl: './token-unit.component.html',
  styleUrls: ['./token-unit.component.scss']
})
export class TokenUnitComponent implements OnInit, OnDestroy {
  tokenId: number = 0;
  unitId: number = 0;
  account: string = this.authStore.account;

  contractAddress = environment.contractAddress;

  token: TokenModel = createInitialTokenModel();
  unit: UnitModel = createInitialUnitModel();
  brandName = "";

  accountSub: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private smartContract: SmartContractService,
              private authStore: AuthStore,
              private snackbar: SnackbarService,
              private dialog: MatDialog,
              private loadingService: LoadingService,
              private authService: AuthService) { }

  ngOnInit() {
    const tmpTokenId: string | null = this.route.snapshot.paramMap.get('tokenId');
    const tmpUnitId: string | null = this.route.snapshot.paramMap.get('unitId');
    if (tmpTokenId && tmpUnitId) {
      this.tokenId = parseInt(tmpTokenId, 10);
      this.unitId = parseInt(tmpUnitId, 10);
    }
    this.initTokens();

    this.smartContract.getBrandName().then(name => {
      this.brandName = name;
    });

    this.accountSub = this.authStore.account$.subscribe(account => {
      this.account = account;
    })
  }

  ngOnDestroy() {
    this.accountSub?.unsubscribe();
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
    this.loadingService.startLoading();
    try {
      await this.checkAuthState();
    } catch (e) {
      console.error(e);
      this.loadingService.stopLoading();
      return;
    }

    const havePermission: boolean = await this.smartContract.havePermission(this.tokenId, this.unitId);
    if (havePermission) {
      this.smartContract.claimUnitOwnership(this.tokenId, this.unitId)
        .then(() => {
          this.initTokens();
          this.snackbar.openSuccess("You successfully received ownership of the token");
          this.loadingService.stopLoading();
        })
        .catch(e => {
          this.snackbar.openDanger("An error has occur, please try again later");
          console.error(e);
          this.loadingService.stopLoading();
        });
    }
    else {
      this.openModal();
      this.loadingService.stopLoading();
    }
  }

  async checkAuthState(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.authStore.account) {
        this.dialog.open(AuthComponent).afterClosed().subscribe(() => {
          if (this.authStore.account) {
            resolve();
          } else {
            reject();
          }
        })
      } else {
        resolve();
      }
    });
  }

  openModal() {
    this.dialog.open(PhoneVerificationComponent, { data: { tokenId: this.tokenId, unitId: this.unitId } });
  }

  openTransferModal() {
    this.dialog.open(TransferTokenComponent, { data: { tokenId: this.tokenId, unitId: this.unitId }}).afterClosed().subscribe(() => {
      this.initTokens();
    });
  }

  connectWallet() {
    this.loadingService.startLoading();
    this.authService.connectMetamask().then(() => {
      this.loadingService.stopLoading();
    }).catch(() => {
      this.snackbar.openDanger('An error as occur, please try again');
      this.loadingService.stopLoading();
    });
  }

  itemStolen() {
    this.loadingService.startLoading();
    this.smartContract.setStatusAsStolen(this.tokenId, this.unitId).then(() => {
      this.loadingService.stopLoading();
      this.snackbar.openSuccess("Token successfully set as 'stolen'");
    }).catch(e => {
      this.loadingService.stopLoading();
      console.error(e);
      this.snackbar.openDanger(e.message);
    })
  }
}
