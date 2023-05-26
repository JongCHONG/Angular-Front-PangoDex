import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PangolinService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerPangolin(username: string, password: string, role: string) {
    const url = `${this.apiUrl}/inscription`;
    const body = { username, password, role };
    return this.http.post(url, body);
  }

  login(username: string, password: string) {
    const url = `${this.apiUrl}/connexion`;
    const body = { username, password };
    return this.http.post(url, body);
  }
  
  getPangolins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des pangolins :', error);
          return throwError('Une erreur est survenue lors de la récupération des pangolins.');
        })
      );
  }

  getPangolin(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  updatePangolinRole(id: string, newRole: string) {
    const url = `${this.apiUrl}/${id}`;
    const body = { role: newRole };
    return this.http.put(url, body);
  }

  addFriend(currentUserId: string, friendId: string) {
    const url = `${this.apiUrl}/${currentUserId}/ajouter-ami`;
    const body = { friendId };
    return this.http.post(url, body);
  }

  deleteFriend(currentUserId: string, friendId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${currentUserId}/supprimer-ami`, { friendId });
  }
}

