import { OrderService } from '../../../services/order.service';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';
import { OrderResponse } from '../../../order/interfaces/order-response.interface';

@Component({
  selector: 'app-admin-orders-list',
  imports: [DatePipe, DecimalPipe, NgClass],
  templateUrl: './orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {

  private orderService = inject(OrderService);

  ordersResource = rxResource<OrderResponse[], void>({
    stream: () => this.orderService.getAllOrders(),
  });


  orders = computed(() => { return this.ordersResource.value() ?? [] });

  isLoading = this.ordersResource.isLoading();
  error = this.ordersResource.error();



  viewDetails(arg0: any) {
    throw new Error('Method not implemented.');
  }

  changeStatus(orderId: number) {
    this.orderService.updateStatus(orderId).subscribe({
      next: () => {
        console.log('Order status updated');
        this.ordersResource.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
