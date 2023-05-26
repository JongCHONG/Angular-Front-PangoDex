import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PangolinComponent } from './pangolin/pangolin.component';

import { CanActivateTeam, UserToken, Permissions } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', component: HomeComponent, canActivate: [CanActivateTeam]},
  { path: 'pangolin/:id', component: PangolinComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateTeam, UserToken, Permissions]  
})
export class AppRoutingModule { }
