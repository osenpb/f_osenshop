import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './features/home/layout/home-layout/home-layout.component';
export const routes: Routes = [
  // 1. La redirección exacta: Solo si la URL es "nada", ve al login
  {
    path: '',
    redirectTo: 'home/index',
    pathMatch: 'full'
  },
  // 2. Rutas específicas
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes'),
  },
  // 3. El Layout de la Home (ahora ya no atrapa a 'auth' porque está después)
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.routes'),
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes'),
      },
      {
        path: 'order',
        loadChildren: () => import('./features/order/order.routes'),
      },
      {
        path: 'checkout',
        loadChildren: () => import('./features/checkout/checkout.routes'),
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'home/index',
  }
];
