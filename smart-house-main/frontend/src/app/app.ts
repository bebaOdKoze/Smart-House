import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { filter } from 'rxjs/operators';
import { SidebarService } from './core/services/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  showLayout = signal(true);

  constructor(private router: Router, public sidenav: SidebarService) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showLayout.set(!['/login', '/register'].includes(e.urlAfterRedirects));
      });
  }

  marginLeft = computed(() =>
    this.showLayout() ? (this.sidenav.isExpanded() ? 210 : 70) : 0
  );

}