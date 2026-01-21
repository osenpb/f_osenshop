
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProductManagementPageComponent } from './pages/product-management-page/product-management-page.component';
import { CategoriesManagementPageComponent } from './pages/categories-management-page/categories-management-page.component';
import { OrderManagementPageComponent } from './pages/order-management-page.component/order-management-page.component';


const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'productos',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'productos',
                component: ProductManagementPageComponent
            },
            {
                path: 'categorias',
                component: CategoriesManagementPageComponent
            },
            {
                path: 'ordenes',
                component: OrderManagementPageComponent
            }
        ]
    }
];

export default adminRoutes;
