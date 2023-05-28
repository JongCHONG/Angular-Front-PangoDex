import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PangolinComponent } from './pangolin/pangolin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CanActivateTeam, UserToken, Permissions } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', component: HomeComponent, canActivate: [CanActivateTeam]},
  { path: 'pangolin/:id', component: PangolinComponent},
  { path: '**', component: NotFoundComponent }, // Wildcard route for 404
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateTeam, UserToken, Permissions]  
})
export class AppRoutingModule { }
