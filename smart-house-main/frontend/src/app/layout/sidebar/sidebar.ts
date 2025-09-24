import { CommonModule } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../core/services/sidebar/sidebar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ButtonModule,  RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  constructor(public sidenavService: SidebarService, private authService: AuthService, private router: Router) {}
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}