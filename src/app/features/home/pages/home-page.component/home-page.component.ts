import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CategoryListComponent } from "../../components/category-list/category-list.component";
import { NewsletterFormComponent } from "../../components/newsletter-form/newsletter-form.component";
import { ImageHeaderComponent } from "../../layout/image-header/image-header.component";
import { ProductListComponent } from '../../../product/components/product-list/product-list.component';
import { SearchByWordComponent } from "../../../product/components/search-by-word/search-by-word.component";


@Component({
  selector: 'app-home-page',
  imports: [ProductListComponent, CategoryListComponent, NewsletterFormComponent, ImageHeaderComponent, SearchByWordComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
