import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { authInterceptor } from './interceptors/auth-interceptor';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register/register';
import { isLoggedInGuard } from './guards/is-logged-in-guard';

export const routes: Routes = [
    {   
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }, {
        path: 'login',
        component : Login
    }, {
        path: 'register',
        component : Register
    },{
        path: 'home',
        component: HomePage,
        canActivate: [isLoggedInGuard]
    }
];
