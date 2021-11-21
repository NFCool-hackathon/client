import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenUnitComponent } from './pages/token-unit/token-unit.component';
import { HomeComponent } from './pages/home/home.component';
import {FourOFourComponent} from "./pages/commom/four-o-four/four-o-four.component";

const routes: Routes = [
  { path: 'token/:tokenId/:unitId', component: TokenUnitComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '404', component: FourOFourComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
