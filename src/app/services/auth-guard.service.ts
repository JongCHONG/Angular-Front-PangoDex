import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserToken {}
export class Permissions {
  canActivate(isLoggedIn: boolean): boolean {
    return isLoggedIn;
  }
}

@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(
    private authService: AuthService,
    private permissions: Permissions,
    private currentUser: UserToken,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      return this.permissions.canActivate(this.authService.isLoggedIn());
    } else {
      // Utilisateur non connecté, rediriger vers la page de connexion
      return this.router.parseUrl('/connexion');
    }
  }
}
