import { Injectable } from '@angular/core';
// @ts-ignore
import Web3 from 'web3';
import { Router } from '@angular/router';
import { SmartContractService } from '../smart-contract.service';
import { AuthStore } from './auth.store';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ethereum = window.ethereum;

  constructor(private web3: Web3,
              private router: Router,
              private smartcontract: SmartContractService,
              private authStore: AuthStore) {}

  get isAuth(): boolean {
    return this.authStore.account !== '';
  }

  public init(): void {
    console.log('[AUTH] - Initialization');
    if (this.checkMetamask()) {
      this.ethereum.request({ method: 'eth_accounts' }).then((res: any) => {
        if (res[0]) {
          this.authStore.account = res[0];
          this.authStore.accountSubject.next(res[0]);
          this.router.navigate(['/']);
        }
      });
    }
  }

  public connectMetamask(): void {
    if (this.checkMetamask()) {
      this.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
        if (res[0]) {
          this.authStore.account = res[0];
          this.authStore.accountSubject.next(res[0]);
          this.router.navigate(['/']);
        }
      });
    }
  }

  public disconnect(): void {
    this.ethereum.request({
      method: 'eth_requestAccounts',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      params: [{ eth_accounts: {} }]
    }).then(() => {
      this.authStore.account = '';
      this.authStore.accountSubject.next(this.authStore.account);
      this.router.navigate(['/login']);
    });
  }

  private checkMetamask(): boolean {
    if (this.ethereum) {
      console.log('[AUTH] - METAMASK is installed');
      this.web3.setProvider(this.ethereum);
      return true;
    } else {
      console.error('[AUTH] - METAMASK is not installed');
      return false;
    }
  }
}
