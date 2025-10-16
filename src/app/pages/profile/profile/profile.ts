import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormField,MatInputModule,MatButtonModule,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private BASE_URL = 'http://localhost:8080';
    loginService = inject(LoginService);


    user: any = {};

    ngOnInit() {
      const uFromSignal = (this.loginService as any).user?.() ?? null;
      if (uFromSignal) {
        this.user = { ...uFromSignal };
        return;
      }
    }

    updateUser() {
      if (!this.user || !this.user.id) {
      console.error('updateUser: user id manquant');
      return;
    }

      this.http.put(`${this.BASE_URL}/user/update/${this.user.id}`, {
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      }).subscribe({
        next: (updatedUser: any) => {
        this.loginService.setUser(updatedUser);
        this.snackBar.open('Profil mis à jour', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-bottom-center']
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Échec de la mise à jour', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-bottom-center', 'snackbar-error']
        });
      }
    });
    }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
