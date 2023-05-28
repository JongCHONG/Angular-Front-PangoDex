import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router, private authService: AuthService) {}

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
  
  getCurrentUserId(): string {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      return parsedUser.currentUser._id;
    }
    return '';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/connexion');
  }
}
