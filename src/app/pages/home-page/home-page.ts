import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Hr } from '../hr-fr/hr/hr';
import { Navbar } from '../../components/navbar/navbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterOutlet,
    MatToolbarModule,
      MatButtonModule, 
      MatIconModule, 
      MatMenuModule,
      Hr,
      Navbar,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatDividerModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage implements OnInit {
  private router = inject(Router);
  loginService = inject(LoginService);
  
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.loginService.restoreFromStorage().subscribe();
    }
  }
  
  navigateToLogin(){
    this.router.navigate(['login']);
  }
}

