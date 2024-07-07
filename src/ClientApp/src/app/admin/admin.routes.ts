import {Routes} from "@angular/router";
import {AdminMenuUsersComponent} from "./admin-menu/admin-menu-users/admin-menu-users.component";
import {CategoryListComponent} from "./admin-menu/category/category-list/category-list.component";
import {SightListComponent} from "./admin-menu/sights/sight-list/sight-list.component";
import {CountryListComponent} from "./admin-menu/countries/country-list/country-list.component";
import {ReviewListComponent} from "./admin-menu/reviews/review-list/review-list.component";
import {ReportListComponent} from "./admin-menu/reports/report-list/report-list.component";

export const adminRoutes: Routes = [
  { path:'', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: AdminMenuUsersComponent, title: 'Users' },
  { path: 'categories', component: CategoryListComponent, title: 'Categories' },
  { path: 'sights', component: SightListComponent, title: 'Sights' },
  { path: 'countries', component: CountryListComponent, title: "Countries" },
  { path: 'reviews', component: ReviewListComponent, title: 'Reviews' },
  { path: 'reports', component: ReportListComponent, title: 'Reports' }
];
