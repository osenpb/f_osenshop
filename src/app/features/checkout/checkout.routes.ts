
import { authGuard } from "../../core/guards";
import { CheckoutFormPageComponent } from "./pages/checkout-form-page/checkout-form-page.component";
import { CheckoutPaymentPageComponent } from "./pages/checkout-payment-page.component/checkout-payment-page.component";


const checkoutRoutes = [
  {
    path: '',
    canActivate: [authGuard(['ROLE_USER'])],
    children: [
      {
        path: '',
        component: CheckoutFormPageComponent
      },
      {
        path: 'payment',
        component: CheckoutPaymentPageComponent
      }
    ],

  },
];

export default checkoutRoutes;
