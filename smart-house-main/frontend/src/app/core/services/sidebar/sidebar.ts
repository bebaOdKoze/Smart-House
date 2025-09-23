import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isExpanded = signal(true);

  toggleSidenav() {
    this.isExpanded.update(v => !v);
  }
}