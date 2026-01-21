import { OrderService } from '../../../services/order.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, AfterViewInit, OnInit, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ChartConfiguration, ChartData, ChartType, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrderResponse } from '../../../order/interfaces/order-response.interface';

@Component({
  selector: 'app-admin-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  private cd = inject(ChangeDetectorRef);

  private OrderService = inject(OrderService);

  private orderResource = rxResource<OrderResponse[], void>({
    stream: () => this.OrderService.getAllOrders(),
  });


  orders = computed(() => this.orderResource.value() ?? []);
  isLoading = this.orderResource.isLoading;
  error = this.orderResource.error;

  pendingOrders = computed(() => {
    const orders = this.orders();
    return orders.filter(o => o.status === 'PENDING').length;
  });

  shippedOrders = computed(() => {
    const orders = this.orders();
    return orders.filter(o => o.status === 'SHIPPED').length;
  });

  deliveredOrders = computed(() => {
    const orders = this.orders();
    return orders.filter(o => o.status === 'DELIVERED').length;
  });

  cancelledOrders = computed(() => {
    const orders = this.orders();
    return orders.filter(o => o.status === 'CANCELLED').length;
  });

  ngOnInit() {
    // Register Chart.js components
    ChartJS.register(ArcElement, Tooltip, Legend);
  }

  ngAfterViewInit() {
    this.cd.detectChanges(); // Forzar a Angular a pintar el canvas una vez inicializado
  }


public pieChartType: ChartType = 'pie';
public pieChartData = computed<ChartData<'pie'>>(() => {
  return {
    labels: ['PENDIENTES', 'ENVIADAS', 'ENTREGADAS', 'CANCELADAS'],
    datasets: [
      {
        data: [this.pendingOrders(), this.shippedOrders(), this.deliveredOrders(), this.cancelledOrders()],
        backgroundColor: ['#42A5F5', '#66BB6A', '#4CAF50', '#F44336'],
      },
    ],
  };
});
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#FFFFFF',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF'
      }
    }
  };
}
