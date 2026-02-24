import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSidebarComponent {

  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  // === UI STATE ===

  // Sidebar visible (mobile)
  readonly sidebarOpen = signal(false);

  // Dropdowns
  readonly productsOpen = signal(false);
  readonly categoriesOpen = signal(false);

  // === ACTIONS ===

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  toggleProducts() {
    this.productsOpen.update(v => !v);
  }

  toggleCategories() {
    this.categoriesOpen.update(v => !v);
  }

  // Optional helpers (si luego quieres cerrar al navegar)
  closeSidebar() {
    this.sidebarOpen.set(false);
  }



}
