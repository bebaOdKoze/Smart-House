import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AuthGuard } from './core/guards/auth.guard';
import { DevicesComponent } from './pages/devices/devices';
import { RulesComponent } from './pages/rules/rules';
import { LogsComponent } from './pages/logs/logs';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
    { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
    { path: 'logs', component: LogsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];