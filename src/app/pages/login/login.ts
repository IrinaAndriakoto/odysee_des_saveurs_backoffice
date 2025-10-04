import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = { username: '', password: '' };
    errorMessage = '';

    constructor(private loginService: LoginService) {}

    onLogin() {
      this.loginService.login(this.credentials).subscribe({
        next: () => console.log(' Connexion réussie'),
        error: () => this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect'
      });
    }
}
