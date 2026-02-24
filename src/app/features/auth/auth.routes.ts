import { AuthLayoutComponent } from './layout/auth-layout.component/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';


const authRoutes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
  ]
    },
    {
      path: '**',
      redirectTo: 'login',
    },
];

export default authRoutes;
