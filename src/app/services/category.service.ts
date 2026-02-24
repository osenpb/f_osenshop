import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryResponse } from '../features/product/interfaces/category-response.interface';
import { CategoryRequest } from '../features/product/interfaces/category-request.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl = `${environment.apiUrl}/categories`;
  private http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<CategoryResponse[]>(`${this.baseUrl}`);
  }

  getCategoryById(id: number) {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: CategoryRequest) {
    return this.http.post<CategoryResponse>(`${this.baseUrl}`, category);
  }

  updateCategory(id: number, category: CategoryRequest) {
    return this.http.put<CategoryResponse>(`${this.baseUrl}/$id}`, category);
  }
}
