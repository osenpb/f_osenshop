import { CheckoutFormPageComponent } from "./pages/checkout-form-page/checkout-form-page.component";
import { MyOrdersComponent } from "./pages/my-orders-page/my-orders-page.component";
import { authGuard } from '../core/guards/auth.guard';

const orderRoutes = [
  {
    path: '',
    canActivate: [authGuard(['ROLE_USER'])],
    children: [
      {
        path: '',
        component: MyOrdersComponent
      },
      {
        path: 'checkout',
        component: CheckoutFormPageComponent
      },
    ],
  },
];

export default orderRoutes;
