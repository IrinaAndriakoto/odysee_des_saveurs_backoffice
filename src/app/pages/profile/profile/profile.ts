import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  private BASE_URL = 'http://localhost:8080';
    loginService = inject(LoginService);


    user: any = {};

    ngOnInit() {
      this.user = {...this.loginService.user()};
    }

    updateUser() {
      this.http.put(`${this.BASE_URL}/user/update/${this.user.id}`, {
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      }).subscribe({
        next: (updatedUser) => {
          this.loginService.setUser(updatedUser);
          alert('User updated successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to update user');
        }
      });
    }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
