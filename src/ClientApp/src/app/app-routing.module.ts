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

import {FavoriteSightsComponent} from "./user/profile/favorite-sights/favorite-sights.component";
import {isAuthenticatedGuard} from "./auth/is-authenticated.guard";
import {ReportComponent} from "./Shared/report/report.component";
import {CategoryListComponent} from "./admin/admin-menu/category/category-list/category-list.component";
import {SightListComponent} from "./admin/admin-menu/sights/sight-list/sight-list.component";
import {CountryListComponent} from "./admin/admin-menu/countries/country-list/country-list.component";
import {UserProfileMainComponent} from "./user/profile/user-profile-main/user-profile-main.component";
import {MainInfoComponent} from "./user/profile/maininfo/main-info.component";
import {MyReviewsComponent} from "./user/profile/my-reviews/my-reviews.component";
import {ReviewListComponent} from "./admin/admin-menu/reviews/review-list/review-list.component";
import {ReportListComponent} from "./admin/admin-menu/reports/report-list/report-list.component";
import {ForgotComponent} from "./auth/forgot/forgot.component";


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'forgot', component: ForgotComponent, title: 'Forgot' }
];

const adminRoutes: Routes = [
  { path:'', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: AdminMenuUsersComponent, title: 'Users' },
  { path: 'categories', component: CategoryListComponent, title: 'Categories' },
  { path: 'sights', component: SightListComponent, title: 'Sights' },
  { path: 'countries', component: CountryListComponent, title: "Countries" },
  { path: 'reviews', component: ReviewListComponent, title: 'Reviews' },
  { path: 'reports', component: ReportListComponent, title: 'Reports' }
];


const userRoutes: Routes = [
  { path: 'favorite', component: FavoriteSightsComponent, data: {title: 'My favorites'} },
  { path: 'profile', component: MainInfoComponent, title: 'Profile'},
  { path: 'reviews', component: MyReviewsComponent, title: 'My reviews' },
  { path: '**', redirectTo: '/user/profile' }
]

const routes: Routes = [
  {  path: '', component: StartPageComponent },
  {  path: 'auth', children: authRoutes, canActivateChild: [isNotAuthenticatedGuard] },
  {  path: 'search', component: SearchPageComponent, title: 'Search' },
  {  path: 'report', component: ReportComponent },
  {  path: 'sight/:id', component: SightDetailComponent, title: 'Sight' },
  {  path: 'admin', component: AdminMenuComponent, children: adminRoutes, canActivate: [isAdminGuard], canActivateChild: [isAdminGuard] },
  {  path: 'user', component: UserProfileMainComponent, children: userRoutes, canActivate: [isAuthenticatedGuard], canActivateChild: [isAuthenticatedGuard] },
  {  path: '**', component: _404Component, title: 'Page not found('}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
