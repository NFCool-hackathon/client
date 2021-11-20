import { Component, OnInit } from '@angular/core';
import {AuthStore} from "../../core/auth/auth.store";
import {AuthService} from "../../core/auth/auth.service";
import {SnackbarService} from "../../core/snackbar.service";
import {TokenModel} from "../../models/token.model";
import {SmartContractService} from "../../core/smart-contract.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  account: string = '';
  tokens: TokenModel[] = [];

  constructor(private authStore: AuthStore,
              private authService: AuthService,
              private snackbar: SnackbarService,
              private smartContract: SmartContractService) { }

  ngOnInit(): void {
    this.authStore.account$.subscribe(account => {
      this.account = account;

      this.getAccountTokens();
    });
  }

  async getAccountTokens() {
    this.tokens = await this.smartContract.getAllAccountTokens();
  }

  connect() {
    this.authService.connectMetamask().then(() => {
      this.getAccountTokens();
    }).catch(() => {
      this.snackbar.openDanger('An error as occur, please try again');
    });
  }
}
