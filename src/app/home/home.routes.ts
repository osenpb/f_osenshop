

import { CartDetailPageComponent } from "../cart/pages/cart-detail-page/cart-detail-page.component";
import { CheckoutFormPageComponent } from "../order/pages/checkout-form-page/checkout-form-page.component";
import { ProductDetailPageComponent } from "../product/pages/product-detail-page/product-detail-page.component";
import { AboutUsPageComponent } from "./pages/about-us-page/about-us-page.component";
import { BrandsPageComponent } from "./pages/brands-page/brands-page.component";
import { HomePageComponent } from "./pages/home-page.component/home-page.component";
import { authGuard } from '../core/guards/auth.guard';

const homeRoutes = [
  {
    path: 'index',
    component: HomePageComponent,
    canActivate: [authGuard(['ROLE_USER'])]
  },
  {
    path: 'product/detail/:id',
    component: ProductDetailPageComponent,
    canActivate: [authGuard(['ROLE_USER'])]
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
    canActivate: [authGuard(['ROLE_USER'])]
  },
  {
    path: 'brands',
    component: BrandsPageComponent,
    canActivate: [authGuard(['ROLE_USER'])]
  },
];

export default homeRoutes;
