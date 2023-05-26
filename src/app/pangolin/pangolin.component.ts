import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PangolinService } from '../services/pangolin.service';
import { AuthService } from '../services/auth.service';
import { Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pangolin',
  templateUrl: './pangolin.component.html',
  styleUrls: ['./pangolin.component.scss'],
})
export class PangolinComponent implements OnInit {
  pangolinId: string = '';
  pangolin: any;
  roles: string[] = [
    'Guerrier',
    'Alchimiste',
    'Sorcier',
    'Espion',
    'Enchanteur',
  ];
  friendNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pangolinService: PangolinService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pangolinId = params['id'];
      this.getPangolinDetails();
    });
  }

  getPangolinDetails(): void {
    this.pangolinService.getPangolin(this.pangolinId).subscribe(
      (response) => {
        this.pangolin = response;
        console.log(this.pangolin);
        this.loadFriendNames();
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des détails du pangolin :',
          error
        );
      }
    );
  }

  updateRole(pangolin: any) {
    this.pangolinService
      .updatePangolinRole(pangolin._id, pangolin.role)
      .subscribe(
        (updatedPangolin: any) => {
          // Update the role of the specific pangolin
          pangolin.role = updatedPangolin.role;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  loadFriendNames(): void {
    const friendObservables: Observable<string>[] = this.pangolin.friends.map(
      (friendId: string) => {
        return this.getPangolinNameById(friendId);
      }
    );

    forkJoin(friendObservables).subscribe(
      (friendNames: string[]) => {
        this.friendNames = friendNames;
      },
      (error) => {
        console.error('Erreur lors du chargement des noms d\'amis :', error);
      }
    );
  }

  getPangolinNameById(friendId: string): Observable<string> {
    return this.pangolinService.getPangolin(friendId).pipe(
      map((response) => {        
        const friend: any = response;
        return friend.username;
      }),
      catchError((error) => {
        console.error(
          'Erreur lors de la récupération des détails du pangolin :',
          error
        );
        return '';
      })
    );
  }
  

  isLoggedIn(): boolean {
    const currentUser = JSON.parse(this.authService.getCurrentUser());
    return currentUser.currentUser._id === this.pangolinId;
  }
}
