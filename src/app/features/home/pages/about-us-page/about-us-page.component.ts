import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutUsTextComponent } from '../../components/about-us-text/about-us-text.component';

@Component({
  selector: 'app-home-page-about-us',
  imports: [AboutUsTextComponent],
  templateUrl: './about-us-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPageComponent { }
