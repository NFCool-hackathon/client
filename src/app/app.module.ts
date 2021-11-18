import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Web3 from "web3";
import { TokenUnitComponent } from './pages/token-unit/token-unit.component';
import { HomeComponent } from './pages/home/home.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    TokenUnitComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [Web3],
  bootstrap: [AppComponent]
})// @ts-ignore
export class AppModule { }// @ts-ignore
// @ts-ignore
