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
import {UserProfile} from "./user/models/UserProfile";
import {MaininfoComponent} from "./user/profile/maininfo/maininfo.component";
import {MyReviewsComponent} from "./user/profile/my-reviews/my-reviews.component";
import {MyReportsComponent} from "./user/profile/my-reports/my-reports.component";


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } }
];

const adminRoutes: Routes = [
  { path:'', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: AdminMenuUsersComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'sights', component: SightListComponent },
  { path: 'countries', component: CountryListComponent }
];

const userProfileRoutes: Routes = [

]

const userRoutes: Routes = [
  { path: 'favorite', component: FavoriteSightsComponent },
  { path: 'profile', component: MaininfoComponent },
  { path: 'reviews', component: MyReviewsComponent },
  { path: 'reports', component: MyReportsComponent },
  { path: '**', redirectTo: '/user/profile' }
]

const routes: Routes = [
  {  path: '', component: StartPageComponent },
  {  path: 'auth', children: authRoutes, canActivateChild: [isNotAuthenticatedGuard] },
  {  path: 'search', component: SearchPageComponent, data: { title: 'Search' } },
  { path: 'report', component: ReportComponent },
  {  path: 'sight/:id', component: SightDetailComponent, data: { title: 'Sight' } },
  {  path: 'admin', component: AdminMenuComponent, children: adminRoutes, canActivate: [isAdminGuard], canActivateChild: [isAdminGuard] },
  {  path: 'user', component: UserProfileMainComponent, children: userRoutes, canActivate: [isAuthenticatedGuard], canActivateChild: [isAuthenticatedGuard] },
  {  path: '**', component: _404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
