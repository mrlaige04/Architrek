import {Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotComponent} from "./forgot/forgot.component";

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'forgot', component: ForgotComponent, title: 'Forgot' }
];
