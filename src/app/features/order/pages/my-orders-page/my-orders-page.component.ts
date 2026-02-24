import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderListComponent } from '../../components/order-list/order-list.component';

@Component({
  selector: 'app-my-orders.component',
  imports: [OrderListComponent],
  templateUrl: './my-orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent { }
