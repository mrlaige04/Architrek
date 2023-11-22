import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AdminService} from "./admin.service";


export const isAdminGuard: CanActivateFn = (route, state) => {
  const admin = inject(AdminService)
  return admin.isInAdmin$;
};
