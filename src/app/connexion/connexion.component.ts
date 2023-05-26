import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PangolinService } from '../services/pangolin.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})

export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;
  errorMessage?: string;
  username: string = '';
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private pangolinService: PangolinService,
    private router: Router,
    private authService: AuthService
  ) {
    this.connexionForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    if (this.connexionForm.invalid) {
      return;
    }

    const username = this.connexionForm.controls['username'].value;
    const password = this.connexionForm.controls['password'].value;

    this.pangolinService.login(username, password).subscribe(
      (response) => {
        this.authService.setLoggedIn(true);
        this.router.navigateByUrl('/home');
        //@ts-ignore
        this.authService.setCurrentUser({currentUser : response.pangolin, token : response.token});
        console.log('Connexion réussie :', response);
      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = 'Identifiant ou mot de passe incorrect.';
      }
    );
  }
}
