import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-layout-footer',
  imports: [],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  currentYear = new Date().getFullYear();

}
