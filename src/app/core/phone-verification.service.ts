import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class PhoneVerificationService {
  constructor(private cloudFunctions: AngularFireFunctions) { }

  public async sendVerificationSms(tokenId: number, unitId: number): Promise<any> {
    const callable = this.cloudFunctions.httpsCallable('sendPhoneVerification');
    return callable({ tokenId, unitId }).toPromise();
  }
}
