import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Web3 from 'web3';
import { TokenUnitComponent } from './pages/token-unit/token-unit.component';
import { HomeComponent } from './pages/home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhoneVerificationComponent } from './modals/phone-verification/phone-verification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { DisplayDangerComponent } from './modals/display-danger/display-danger.component';
import { DisplaySuccessComponent } from './modals/display-success/display-success.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenUnitComponent,
    HomeComponent,
    PhoneVerificationComponent,
    DisplayDangerComponent,
    DisplaySuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    A11yModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireFunctionsModule
  ],
  providers: [Web3],
  bootstrap: [AppComponent]
})// @ts-ignore
export class AppModule { }// @ts-ignore
// @ts-ignore
