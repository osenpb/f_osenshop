import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-admin-categories-list',
  imports: [],
  templateUrl: './categories-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {

  private categoryService = inject(CategoryService);

  categoriesResource = rxResource<any, void>({
    stream: () => this.categoryService.getAllCategories(),
    }
  );

  categories = computed(() => {
    return this.categoriesResource.value();
  });

  isLoading = this.categoriesResource.isLoading();

  error = this.categoriesResource.error();


  onEdit(_t17: any) {
  throw new Error('Method not implemented.');
  }
  onDelete(arg0: any) {
  throw new Error('Method not implemented.');
  }




}
