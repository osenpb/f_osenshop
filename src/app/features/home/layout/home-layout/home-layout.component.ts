import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from "../navbar/navbar.component";

import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [NavBarComponent, RouterOutlet, FooterComponent, ],
  templateUrl: './home-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent { }
