import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log('Interceptor appelé, type de req:', typeof req, req); // Debug
  
  const loginService = inject(LoginService);
  const token = loginService.getToken();

  if (!token) {
    return next(req);
  }

  // Vérification explicite que req a bien la méthode clone
  if (!req || typeof req.clone !== 'function') {
    console.warn('AuthInterceptor - Requête ignorée, objet inattendu:', req);
    return next(req);
  }

  const clonedReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(clonedReq);
};
