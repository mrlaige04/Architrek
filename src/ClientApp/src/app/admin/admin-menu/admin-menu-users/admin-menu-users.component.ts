import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminService} from "../../admin.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-admin-menu-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-menu-users.component.html',
  styleUrl: './admin-menu-users.component.scss'
})
export class AdminMenuUsersComponent {
  users$: Observable<User[]>;
  constructor(private admin: AdminService) {
    this.users$ = admin.users;
  }

  deleteUser(id: Guid) {
    this.admin.deleteUser(id).subscribe(data=>{
      if (data) this.users$ = this.admin.users;
    })
  }
}
