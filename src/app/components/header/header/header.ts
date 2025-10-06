import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user.model';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  private router = inject(Router);
  loginService = inject(LoginService);

  user: UserModel | null = null;
  ngOnInit(){
    this.loginService.getUser().subscribe({
      next: (user) => this.user = user,
      error: () => this.user = null
    });
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  onLogout(){
    this.loginService.logout();
  }
}
