import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private currentUser: string = "";

  constructor() {
    // Vérifier l'état de connexion au chargement du service
    this.loggedIn = this.checkLocalStorage();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
    this.updateLocalStorage();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setCurrentUser(currentUser: object): void {
    this.currentUser = JSON.stringify(currentUser);
    localStorage.setItem('currentUser', this.currentUser);
  }

  getCurrentUser(): string {
    if (!this.currentUser) {
      const storedcurrentUser = localStorage.getItem('currentUser');
      if (typeof storedcurrentUser === 'string') {
        this.currentUser = storedcurrentUser;
      }
    }
    return this.currentUser;
  }

  logout() {
    this.setLoggedIn(false);
    // Supprime l'état de connexion de localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  private checkLocalStorage(): boolean {
    const storedValue = localStorage.getItem('isLoggedIn');
    return !!storedValue && storedValue === 'true';
  }

  private updateLocalStorage() {
    localStorage.setItem('isLoggedIn', this.loggedIn ? 'true' : 'false');
  }
}

