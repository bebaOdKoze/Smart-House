import { CommonModule } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../core/services/sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ButtonModule,  RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  constructor(public sidenavService: SidebarService) {}
}