import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import { TokenModel } from '../models/token.model';
import { UnitModel } from '../models/unit.model';
import { AuthStore } from './auth/auth.store';
import {websocketProvider} from "../../../keys.env";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);
  private contractReadable = new this.webSocket3.eth.Contract(contractABI.abi, environment.contractAddress);

  public permissionSubject = new Subject<any>();

  permissionSub: any;

  constructor(private web3: Web3,
              private webSocket3: Web3,
              private authStore: AuthStore) {
    this.webSocket3.setProvider(websocketProvider);
    this.subToOwnershipPermissionGave();
  }

  public async getToken(id: number): Promise<TokenModel> {
    return await this.contract.methods.tokenData(id).call();
  }

  public async getAllAccountTokens(): Promise<TokenModel[]> {
    if (!this.authStore.account) {
      throw 'You need to connect your wallet';
    }
    const balances: number[] = await this.contract.methods.allBalancesOf(this.authStore.account).call();
    const tokens: TokenModel[] = [];

    for (let i = 0 ; i < balances.length ; i++) {
      if (balances[i] > 0) {
        const token:TokenModel = await this.getToken(i);
        tokens.push(token);
      }
    }

    return tokens;
  }

  public async getTokenUnit(tokenId: number, unitId: number): Promise<UnitModel> {
    return await this.contract.methods.tokenUnitData(tokenId, unitId).call();
  }

  public async requestPinVerification(tokenId: number, unitId: number, pin: number) {
    // this.subToOwnershipPermissionGave();
    return await this.contract.methods.requestPhoneVerification(tokenId.toString(), unitId.toString(), this.authStore.account, pin.toString()).send({ from: this.authStore.account });
  }

  public async claimUnitOwnership(tokenId: number, unitId: number) {
    return await this.contract.methods.claimOwnership(tokenId, unitId, this.authStore.account).send({ from: this.authStore.account });
  }

  public async havePermission(tokenId: number, unitId: number): Promise<boolean> {
    return await this.contract.methods.haveClaimPermission(tokenId, unitId, this.authStore.account).call();
  }

  public async transferTokenUnit(tokenId: number, unitId: number, to: string): Promise<void> {
    return await this.contract.methods.safeUnitTransferFrom(this.authStore.account, to, tokenId, unitId, this.web3.utils.fromAscii('')).send({from: this.authStore.account});
  }

  public async setStatusAsStolen(tokenId: number, unitId: number): Promise<void> {
    return await this.contract.methods.unitStolen(tokenId, unitId).send({from: this.authStore.account});
  }

  private subToOwnershipPermissionGave() {
    console.log('Sub to OwnershipPermissionGave with ' + this.authStore.account);
    this.permissionSub = this.contractReadable.events.OwnershipPermissionGave({
    }, () => {
    }).on('data', (event: any) => {
      console.log(event); // same results as the optional callback above
      this.permissionSubject.next(event.returnValues);
    });
  }

}
