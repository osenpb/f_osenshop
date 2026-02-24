import { OrderService } from '../../../../services/order.service';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { NotificationService } from '../../../../services/notification.service';
import { OrderResponse } from '../../../../interfaces/order/order-response.interface';

@Component({
  selector: 'app-admin-orders-list',
  imports: [DatePipe, DecimalPipe, NgClass],
  templateUrl: './orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {

  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);

  ordersResource = rxResource<OrderResponse[], void>({
    stream: () => this.orderService.getAllOrders(),
  });


  orders = computed(() => { return this.ordersResource.value() ?? [] });

  isLoading = this.ordersResource.isLoading();
  error = this.ordersResource.error();



  viewDetails(orderId: number) {
    const order = this.orders().find(o => o.id === orderId);
    if (order) {
      alert(`Order Details:\nID: ${order.id}\nTotal: $${order.total}\nStatus: ${order.status}\nItems: ${order.items.length}\nShipping: ${order.shippingAddress}`);
    }
  }

  changeStatus(orderId: number) {
    this.orderService.updateStatus(orderId).subscribe({
      next: () => {
        this.ordersResource.reload();
      },
      error: (err) => {
        this.notificationService.error('Error al actualizar el estado del pedido. Por favor, inténtalo de nuevo.');
      }
    });
  }

}
