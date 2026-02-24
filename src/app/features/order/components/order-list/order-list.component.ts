import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';


import { LoadingSpinnerComponent } from "../../../home/components/loading-spinner/loading-spinner.component";
import { OrderService } from '../../../../services/order.service';
import { OrderResponse } from '../../../../interfaces/order/order-response.interface';

@Component({
  selector: 'app-order-list',
  imports: [DatePipe, DecimalPipe, NgClass, LoadingSpinnerComponent],
  templateUrl: './order-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
viewDetails(arg0: any) {
throw new Error('Method not implemented.');
}

  private orderService = inject(OrderService);

  orderResource = rxResource<OrderResponse[], void>({
    stream: () => this.orderService.getOrdersByUserId(),
  });

  isLoading = computed(() => this.orderResource.isLoading());
  orders = computed(() => this.orderResource.value() ?? []);
  error = computed(() => this.orderResource.error());

}
