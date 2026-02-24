import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "../../../home/layout/navbar/navbar.component";

@Component({
  selector: 'app-layout.component',
  imports: [AdminSidebarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent { }
