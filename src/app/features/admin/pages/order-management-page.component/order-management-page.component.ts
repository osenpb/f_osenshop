import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderListComponent } from "../../components/orders-list/orders-list.component";

@Component({
  selector: 'app-order-management-page',
  imports: [OrderListComponent],
  templateUrl: './order-management-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderManagementPageComponent {




}
