import { CartDetailPageComponent } from "./pages/cart-detail-page/cart-detail-page.component";
import { authGuard } from '../../core/guards/auth.guard';


const cartRoutes = [
  {
    path: '',
    canActivate: [authGuard(['ROLE_USER'])],
    children: [
      {
        path: '',
        component: CartDetailPageComponent
      },
    ],
  },
];

export default cartRoutes;
