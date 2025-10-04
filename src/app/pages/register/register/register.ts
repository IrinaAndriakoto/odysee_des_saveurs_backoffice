import { Component, inject } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user: UserModel = { username: '', password: '', firstName: '', lastName: '' };
    message = '';
  
    private router = inject(Router);

    constructor(private loginService: LoginService) {}

    onRegister() {
      this.loginService.register(this.user).subscribe({
        next: () => this.message = ' Inscription réussie ! Vous pouvez vous connecter.',
        error: () => this.message = ' Erreur lors de l’inscription.'
      });
    }

    goHome(){
    this.router.navigate(['/login']);
  }
}
