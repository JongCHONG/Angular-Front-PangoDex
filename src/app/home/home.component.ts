import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PangolinService } from '../services/pangolin.service';
import { AuthService } from '../services/auth.service';
import {
  faUser,
  faUserPlus,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnChanges {
  pangolins: any[] = [];
  faUser = faUser;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;
  toggleMessage: boolean = false;
  message: string = '';
  currentUser: any; // Define currentUser property

  constructor(
    private pangolinService: PangolinService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getPangolins();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUser']) {
      this.updateIconState();
    }
  }

  getCurrentUser(): void {
    this.currentUser = JSON.parse(this.authService.getCurrentUser());
  }

  getPangolins(): void {
    this.pangolinService.getPangolins().subscribe(
      (pangolins) => {
        this.pangolins = pangolins;
        this.updateIconState(); // Update icon state after getting pangolins
      },
      (error) => {
        console.error('Error fetching pangolins:', error);
      }
    );
  }

  addFriend(friendId: string) {
    this.pangolinService
      .addFriend(this.currentUser.currentUser._id, friendId)
      .subscribe(
        (response) => {
          // Handle the successful addition of a friend
          console.log('Ami ajouté avec succès :', response);
          this.currentUser.currentUser.friends.push(friendId);
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.getPangolins(); // Refresh the pangolin details after adding a friend
          this.toggleMessage = true;
          this.message = 'Ami ajouté!';
          setTimeout(() => {
            this.toggleMessage = false;
          }, 5000); // Hide the message after 2 seconds
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'ami :", error);
        }
      );
  }

  deleteFriend(friendId: string) {
    this.pangolinService
      .deleteFriend(this.currentUser.currentUser._id, friendId)
      .subscribe(
        (response) => {
          // Handle the successful deletion of a friend
          console.log('Ami supprimé avec succès :', response);
          this.currentUser.currentUser.friends =
            this.currentUser.currentUser.friends.filter(
              (friend: string) => friend !== friendId
            );
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.getPangolins(); // Refresh the pangolin details after deleting a friend
          this.toggleMessage = true;
          this.message = 'Ami supprimé!';
          setTimeout(() => {
            this.toggleMessage = false;
          }, 5000); // Hide the message after 2 seconds
        },
        (error) => {
          console.error("Erreur lors de la suppression de l'ami :", error);
        }
      );
  }

  inFriendsList(pangolin: any): boolean {
    return this.currentUser.currentUser.friends.includes(pangolin._id);
  }

  modifyFriends(pangolin: any) {
    if (this.inFriendsList(pangolin)) {
      this.deleteFriend(pangolin._id);
    } else {
      this.addFriend(pangolin._id);
    }
  }

  isCurrentUser(pangolin: any): boolean {
    return pangolin._id === this.currentUser.currentUser._id;
  }

  updateIconState(): void {
    if (this.pangolins.length > 0) {
      this.pangolins.forEach((pangolin) => {
        pangolin.icon = this.inFriendsList(pangolin)
          ? this.faUserMinus
          : this.faUserPlus;
      });
    }
  }
}
