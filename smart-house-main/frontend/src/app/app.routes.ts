import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { DevicesComponent } from './pages/devices/devices';
import { RulesComponent } from './pages/rules/rules';
import { LogsComponent } from './pages/logs/logs';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'devices', component: DevicesComponent, canActivate: [authGuard] },
    { path: 'rules', component: RulesComponent, canActivate: [authGuard] },
    { path: 'logs', component: LogsComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];