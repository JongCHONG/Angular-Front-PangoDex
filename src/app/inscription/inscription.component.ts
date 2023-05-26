import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PangolinService } from '../services/pangolin.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: FormGroup;
  errorMessage?: string;
  username: string = '';
  password: string = '';
  roles: string[] = [
    'Guerrier',
    'Alchimiste',
    'Sorcier',
    'Espion',
    'Enchanteur',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private pangolinService: PangolinService,
    private authService: AuthService,
    private router: Router
  ) {
    this.inscriptionForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    if (this.inscriptionForm.invalid) {
      return;
    }

    const username = this.inscriptionForm.controls['username'].value;
    const password = this.inscriptionForm.controls['password'].value;
    const role = this.inscriptionForm.controls['role'].value;

    this.pangolinService.registerPangolin(username, password, role).subscribe(
      (response) => {
        console.log('Inscription réussie :', response);
        this.router.navigateByUrl('/');
        // Effectuez ici les actions nécessaires après une inscription réussie (par exemple, redirection vers une autre page)
      },
      (error) => {
        console.error("Erreur lors de l'inscription :", error);
        this.errorMessage = "Une erreur est survenue lors de l'inscription.";
      }
    );
  }
}
