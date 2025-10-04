import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private BASE_URL = 'http://localhost:8080';

  private http = inject(HttpClient);
  user = signal<UserModel | null>(null);

  constructor(
    // private http: HttpClient,
    private router: Router
  ) {
    
  }

  // Enregistrer un nouvel utilisateur
  register(user: UserModel) {
    return this.http.post(`${this.BASE_URL}/auth/register`, user);
  }

  // Se connecter et sauvegarder le token
  login(credentials: {username: string; password: string}) {
    return this.http.post<{ token: string}> (`${this.BASE_URL}/auth/login`, credentials)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      })
    );
  }

  getUser(): Observable<UserModel | null> {
    return this.http.get<UserModel>(`${this.BASE_URL}/user/me`).pipe(
      tap((result: UserModel) => {
        this.user.set(result); // on stocke le user dans le signal
      }),
      map(() => this.user())
    );
  }

  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}
