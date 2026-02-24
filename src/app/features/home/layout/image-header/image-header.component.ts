import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-home-image-header',
  imports: [],
  templateUrl: './image-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageHeaderComponent {

  title = input<string>('Tienda');


}
