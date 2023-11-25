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
import {FavoriteSightsComponent} from "./user/profile/favorite-sights/favorite-sights.component";
import {isAuthenticatedGuard} from "./auth/is-authenticated.guard";
import {ReportComponent} from "./Shared/report/report.component";
import {CategoryListComponent} from "./admin/admin-menu/category/category-list/category-list.component";


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } }
];

const adminRoutes: Routes = [
  { path:'', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: AdminMenuUsersComponent },
  { path: 'createCategory', component: CreateCategoryComponent },
  { path: 'categories', component: CategoryListComponent }
];

const userRoutes: Routes = [
  { path: 'favorite', component: FavoriteSightsComponent }
]

const routes: Routes = [
  {  path: '', component: StartPageComponent },
  {  path: 'auth', children: authRoutes, canActivateChild: [isNotAuthenticatedGuard] },
  {  path: 'search', component: SearchPageComponent, data: { title: 'Search' } },
  { path: 'report', component: ReportComponent },
  {  path: 'sight/:id', component: SightDetailComponent, data: { title: 'Sight' } },
  {  path: 'admin', component: AdminMenuComponent, children: adminRoutes, canActivate: [isAdminGuard], canActivateChild: [isAdminGuard] },
  {  path: 'user', children: userRoutes, canActivate: [isAuthenticatedGuard], canActivateChild: [isAuthenticatedGuard] },
  {  path: '**', component: _404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
