import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us-text',
  imports: [RouterLink],
  templateUrl: './about-us-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsTextComponent { }
