import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private BASE_URL = 'http://localhost:8080/auth';

  private http = inject(HttpClient);
  user = signal<UserModel | null>(null);

  constructor(
    // private http: HttpClient,
    private router: Router
  ) {
    
  }

  // Enregistrer un nouvel utilisateur
  register(user: UserModel) {
    return this.http.post(`${this.BASE_URL}/register`, user);
  }

  // Se connecter et sauvegarder le token
  login(credentials: {username: string; password: string}) {
    return this.http.post<{ token: string}> (`${this.BASE_URL}/login`, credentials)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      })
    );
  }

  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.user.set(null);
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}
