import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Web3 from 'web3';

// @ts-ignore
import contractABI from '../../assets/abi/NFCool.json';
import { TokenModel } from '../models/token.model';
import {UnitModel} from "../models/unit.model";

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {
  private contract = new this.web3.eth.Contract(contractABI.abi, environment.contractAddress);

  constructor(private web3: Web3) { }

  public async getToken(id: number): Promise<TokenModel> {
    return await this.contract.methods.tokenData(id).call();
  }

  public async getTokenUnit(tokenId: number, unitId: number): Promise<UnitModel> {
    return await this.contract.methods.tokenUnitData(tokenId, unitId).call();
  }
}
