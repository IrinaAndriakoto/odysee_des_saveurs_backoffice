import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage implements OnInit{
  private router = inject(Router);
  loginService = inject(LoginService);

  user: UserModel | null = null;
  
  ngOnInit(){
    this.loginService.getUser().subscribe({
      next: (user) => this.user = user,
      error: () => this.user = null
    });
  }

  onLogout(){
    this.loginService.logout();
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

}
