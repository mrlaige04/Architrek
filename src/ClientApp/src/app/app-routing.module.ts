import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SearchPageComponent} from "./core/search-page/search-page.component";

const authRoutes: Routes = [
  {path:'login', component: LoginComponent, title: 'Login'},
  {path:'register', component: RegisterComponent, title: 'Register'}
]
const routes: Routes = [
  {path:'auth', children: authRoutes},
  {path:'search', component: SearchPageComponent, title: 'Search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
