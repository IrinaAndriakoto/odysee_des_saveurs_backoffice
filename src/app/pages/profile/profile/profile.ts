import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Navbar } from '../../../components/navbar/navbar';

@Component({
  selector: 'app-profile',
  imports: [MatFormField,MatInputModule,MatButtonModule,Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
private router = inject(Router);
  loginService = inject(LoginService);

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
