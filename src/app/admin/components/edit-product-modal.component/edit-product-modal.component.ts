import { ProductService } from '../../../services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ChangeDetectionStrategy, Component, inject, input, output, computed, signal, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductResponse } from '../../../product/interfaces/product-response.interface';
import { CategoryResponse } from '../../../product/interfaces/category-response.interface';
import { ProductRequest } from '../../../product/interfaces/product-request.interface';
import { UpdateProductRequest } from '../../../product/interfaces/update-product-request';


@Component({
  selector: 'app-admin-edit-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductModalComponent {

  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  open = input<boolean>(false);
  close = output<void>();
  productId = input<number>(0);
  mode = input<'edit' | 'add'>('edit');
  saved = output<void>();


  editForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    imageUrl: ['', Validators.required],
    categoryId: [0, Validators.required],
    price: [0, Validators.required],
    stock: [0, Validators.required],
    description: ['', Validators.required],
    isActive: [true, Validators.required],
  });


  productResource = rxResource<ProductResponse | null, number>({
    params: () => this.productId(),
    stream: ({ params }) => this.productService.getProductById(params),
    defaultValue: null,
  });

  // Cargar los datos del producto en el formulario (solo en modo edit)
  constructor() {
    effect(() => {
      if (this.mode() === 'add') {
        // Reset form for adding new product
        this.editForm.reset({
          name: '',
          imageUrl: '',
          categoryId: 0,
          price: 0,
          stock: 0,
          description: '',
          isActive: true,
        });
        return;
      }

      const product = this.product();
      if (!product) return;

      this.editForm.patchValue({
        name: product.name,
        imageUrl: product.imageUrl,
        categoryId: +product.category.id,
        price: product.price,
        stock: product.stock,
        description: product.description,
        isActive: product.isActive,
      });
    });
  }


  categoryResource = rxResource<CategoryResponse[], void>({
    stream: () => this.categoryService.getAllCategories(),
  }
  );
  categories = computed(() => {
    return this.categoryResource.value();
  })

  isLoading = this.categoryResource.isLoading;
  error = this.categoryResource.error;

  product = computed(() => {
    return this.productResource.value();
  });

  onSave() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const editFormControls = this.editForm.controls;

    if (this.mode() === 'add') {
      const payload: ProductRequest = {
        name: editFormControls.name.value,
        imageUrl: editFormControls.imageUrl.value,
        categoryId: editFormControls.categoryId.value,
        price: editFormControls.price.value,
        stock: editFormControls.stock.value,
        description: editFormControls.description.value,
        isActive: editFormControls.isActive.value,
      };

      this.productService
        .createProduct(payload)
        .subscribe({
          next: () => {
            this.closeModal();
            this.saved.emit();
          },
          error: (err) => console.error(err),
        });
    } else {
      const payload: UpdateProductRequest = {
        id: this.productId(),
        name: editFormControls.name.value,
        imageUrl: editFormControls.imageUrl.value,
        categoryId: editFormControls.categoryId.value,
        price: editFormControls.price.value,
        stock: editFormControls.stock.value,
        description: editFormControls.description.value,
        isActive: editFormControls.isActive.value,
      };

      this.productService
        .updateProduct(this.productId(), payload)
        .subscribe({
          next: () => {
            this.closeModal();
            this.saved.emit();
          },
          error: (err) => console.error(err),
        });
    }
  }

  closeModal() {
    this.close.emit();
  }

}
