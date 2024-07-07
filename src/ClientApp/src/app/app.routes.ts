import {Routes} from "@angular/router";
import {AdminMenuComponent} from "./admin/admin-menu/admin-menu.component";
import {isAdminGuard} from "./admin/is-admin.guard";
import {isNotAuthenticatedGuard} from "./auth/is-not-authenticated.guard";
import {UserProfileMainComponent} from "./user/profile/user-profile-main/user-profile-main.component";
import {isAuthenticatedGuard} from "./auth/is-authenticated.guard";

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminMenuComponent,
    loadChildren: () => import('./admin/admin.routes').then(a => a.adminRoutes),
    canActivate: [isAdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(a => a.authRoutes),
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'user',
    component: UserProfileMainComponent,
    loadChildren: () => import('./user/user.routes').then(a => a.userRoutes),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '',
    loadChildren: () => import('./core/core.routes').then(a => a.coreRoutes),
  }
]
