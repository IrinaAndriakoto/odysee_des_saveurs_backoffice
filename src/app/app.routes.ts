import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register/register';
import { isLoggedInGuard } from './guards/is-logged-in-guard';
import { Profile } from './pages/profile/profile/profile';
import { Hr } from './pages/hr-fr/hr/hr';
import { DishesStocks } from './pages/dishes-stocks/dishes-stock component/dishesStocks';

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
        canActivate: [isLoggedInGuard],
        children: [
          { path: '', redirectTo: 'hr-fr', pathMatch: 'full' }, // optionnel : page par défaut
          { path: 'profile', component: Profile },
          { path: 'hr-fr', component: Hr },
          { path: 'dish-stock', component: DishesStocks }
        ]
    }
];
