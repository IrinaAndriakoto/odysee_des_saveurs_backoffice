import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserModel } from '../../models/user.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatDividerModule,MatToolbarModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit{
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
    this.router.navigate(['home', 'profile']);
  }

  onLogout(){
    this.loginService.logout();
  }
}
