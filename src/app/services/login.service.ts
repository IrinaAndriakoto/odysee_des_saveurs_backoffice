import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
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

  // Se connecter et sauvegarder le token, puis récupérer le user connecté
  login(credentials: {username: string; password: string}) {
    return this.http.post<{ token: string}> (`${this.BASE_URL}/auth/login`, credentials)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      switchMap(() => this.getUser()), // récupère le user et met à jour le signal
      tap(() => {
        this.router.navigate(['/home']); // navigation après récupération user
      })
    );
  }

  getUser(): Observable<UserModel | null> {
    const url = `${this.BASE_URL}/user/me`;
    return this.http.get<UserModel>(url).pipe(
      tap(u => this.user.set(u)),
      map(u => u ?? null)
    );
  }

  setUser(user: any) {
  this.user = user;
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
  
  // appeler après login pour persister token et charger le user
  handleLoginToken(token: string) {
    localStorage.setItem('token', token);
    return this.getUser(); // renvoie Observable<UserModel | null>
  }

  // restore auth au démarrage : si token présent -> getUser()
  restoreFromStorage(): Observable<UserModel | null> {
    const token = this.getToken();
    if (!token) {
      this.user.set(null);
      return of(null);
    }
    return this.getUser();
  }

  // optionnel: appeler backend logout endpoint
}
