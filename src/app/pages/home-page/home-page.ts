import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Header } from '../../components/header/header/header';

@Component({
  selector: 'app-home-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,Header],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage {
  private router = inject(Router);
  loginService = inject(LoginService);
  
  navigateToLogin(){
    this.router.navigate(['login']);
  }
}

