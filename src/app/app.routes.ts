import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home/layout/home-layout/home-layout.component';
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
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
  },
  // 3. El Layout de la Home (ahora ya no atrapa a 'auth' porque está después)
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.routes'),
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.routes'),
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.routes'),
      },
    ]
  },
  // 4. El comodín: Si nada de lo anterior coincidió
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
