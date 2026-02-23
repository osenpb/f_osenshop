import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-layout-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);


  isAuthenticated = this.authService.isAuthenticated;
  user = this.authService.user; // esto trae el signal, si usara user() traeria el valor actual, x lo que no seria reactivo
  isUserMenuOpen = signal(false);

  mobileMenuOpen = signal(false);


  toggleUserMenu() {
    this.isUserMenuOpen.update(v => !v);
  }

  closeUserMenu() {
    this.isUserMenuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.closeUserMenu();
    this.router.navigate(['/auth/login']);
  }


  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  showUser() {
    // User display logic - currently no UI implementation
    const user = this.user();
    if (!user) {
      // Handle no user case
    } else {
      // Handle user display
    }
  }
}
