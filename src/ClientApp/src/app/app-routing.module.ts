import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SearchPageComponent} from "./core/search-page/search-page.component";
import {SightDetailComponent} from "./core/sight-detail/sight-detail.component";
import {isNotAuthenticatedGuard} from "./auth/is-not-authenticated.guard";
import {StartPageComponent} from "./core/start-page/start-page.component";
import {isAdminGuard} from "./admin/is-admin.guard";
import {AdminMenuComponent} from "./admin/admin-menu/admin-menu.component";
import {AdminMenuUsersComponent} from "./admin/admin-menu/admin-menu-users/admin-menu-users.component";
import {_404Component} from "./Shared/404/404.component";
import {CreateCategoryComponent} from "./admin/admin-menu/category/create-category/create-category.component";


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } }
];

const adminRoutes: Routes = [
  { path:'', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: AdminMenuUsersComponent },
  { path: 'createCategory', component: CreateCategoryComponent }
];

const routes: Routes = [
  {  path: '', component: StartPageComponent },
  {  path: 'auth', children: authRoutes, canActivateChild: [isNotAuthenticatedGuard] },
  {  path: 'search', component: SearchPageComponent, data: { title: 'Search' } },
  {  path: 'sight/:id', component: SightDetailComponent, data: { title: 'Sight' } },
  {  path: 'admin', component: AdminMenuComponent, children: adminRoutes, canActivate: [isAdminGuard], canActivateChild: [isAdminGuard] },
  { path: '**', component: _404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
