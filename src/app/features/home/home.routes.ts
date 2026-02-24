

import { CartDetailPageComponent } from "../cart/pages/cart-detail-page/cart-detail-page.component";
import { CheckoutFormPageComponent } from "../checkout/pages/checkout-form-page/checkout-form-page.component";
import { ProductDetailPageComponent } from "../product/pages/product-detail-page/product-detail-page.component";
import { AboutUsPageComponent } from "./pages/about-us-page/about-us-page.component";
import { BrandsPageComponent } from "./pages/brands-page/brands-page.component";
import { HomePageComponent } from "./pages/home-page.component/home-page.component";
import { authGuard } from '../../core/guards/auth.guard';

const homeRoutes = [
  {
    path: 'index',
    component: HomePageComponent,
  },
  {
    path: 'product/detail/:id',
    component: ProductDetailPageComponent,
  },
  // {
  //   path: 'cart',
  //   component: CartDetailPageComponent
  // },
  {
    path: 'checkout',
    component: CheckoutFormPageComponent,
    canActivate: [authGuard(['ROLE_USER'])]
  },
  {
    path: 'about',
    component: AboutUsPageComponent,
  },
  {
    path: 'brands',
    component: BrandsPageComponent,
  },
];

export default homeRoutes;
