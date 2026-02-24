import { MyOrdersComponent } from "./pages/my-orders-page/my-orders-page.component";
import { authGuard } from '../../core/guards/auth.guard';

const orderRoutes = [
  {
    path: '',
    canActivate: [authGuard(['ROLE_USER'])],
    children: [
      {
        path: '',
        component: MyOrdersComponent
      },
    ],
  },
];

export default orderRoutes;
