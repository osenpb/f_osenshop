import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoriesListComponent } from "../../components/categories-list.component/categories-list.component";

@Component({
  selector: 'app-categories-management-page.component',
  imports: [CategoriesListComponent],
  templateUrl: './categories-management-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesManagementPageComponent { }
