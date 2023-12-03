import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminService} from "../../admin.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Guid} from "guid-typescript";
import {CreateCategoryFormComponent} from "../category/create-category-form/create-category-form.component";

import {PaginatedList} from "../../../core/Models/PaginatedList";

@Component({
  selector: 'app-admin-menu-users',
  standalone: true,
  imports: [CommonModule, CreateCategoryFormComponent],
  templateUrl: './admin-menu-users.component.html',
  styleUrl: './admin-menu-users.component.scss'
})
export class AdminMenuUsersComponent {
  users$: Observable<PaginatedList<User>>;
  pageNumber= 1;
  pageSize = 10;

  constructor(private admin: AdminService) {
    this.users$ = this.admin.getUsers({pageNumber: this.pageNumber, pageSize: this.pageSize})
  }

  deleteUser(id: Guid) {
    this.admin.deleteUser(id).subscribe(data=>{
      if (data.succeeded) this.getUsers()
    })
  }

  getUsers() {
    this.users$ = this.admin.getUsers({pageNumber: this.pageNumber, pageSize: this.pageSize})
  }

  nextPage() {
    this.pageNumber++;
    this.getUsers()
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getUsers()
    }
  }
}
