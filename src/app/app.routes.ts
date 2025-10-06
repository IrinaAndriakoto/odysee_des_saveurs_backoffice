import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register/register';
import { isLoggedInGuard } from './guards/is-logged-in-guard';
import { Profile } from './pages/profile/profile/profile';

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
    }, {
        path:'profile',
        component: Profile,
        canActivate: [isLoggedInGuard]
    }
];
