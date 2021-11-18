import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import { TokenModel } from '../models/token.model';
import { UnitModel } from '../models/unit.model';
import { AuthStore } from './auth/auth.store';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);

  constructor(private web3: Web3,
              private authStore: AuthStore) { }

  public async getToken(id: number): Promise<TokenModel> {
    return await this.contract.methods.tokenData(id).call();
  }

  public async getTokenUnit(tokenId: number, unitId: number): Promise<UnitModel> {
    return await this.contract.methods.tokenUnitData(tokenId, unitId).call();
  }

  public async claimOwnership(tokenId: number, unitId: number, pin: number) {
    return await this.contract.methods.requestOwnership(tokenId.toString(), unitId.toString(), this.authStore.account, pin.toString()).send({ from: this.authStore.account });
  }
}
