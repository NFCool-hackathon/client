import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenUnitComponent } from './pages/token-unit/token-unit.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'token/:tokenId/:unitId', component: TokenUnitComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
