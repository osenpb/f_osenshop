import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandsComponent } from '../../components/brands/brands.component';

@Component({
  selector: 'app-home-page-brands',
  imports: [BrandsComponent],
  templateUrl: './brands-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsPageComponent { }
