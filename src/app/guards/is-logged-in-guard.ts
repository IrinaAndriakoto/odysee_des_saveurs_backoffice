import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class isLoggedInGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else{ 
    this.router.navigate(['/login']);
    return false;
    }
  }
}
