import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {Category} from "../../../../core/Models/category";
import {CoreService} from "../../../../core/core.service";
import {FormsModule} from "@angular/forms";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Guid} from "guid-typescript";
import {AdminService} from "../../../admin.service";
import {ToastersService} from "../../../../services/ToastersService";
import {CreateCategoryFormComponent} from "../create-category-form/create-category-form.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateCategoryFormComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories$: Observable<PaginatedList<Category>>;
  pageNumber = 1;
  pageSize = 10;

  constructor(core: CoreService, private admin: AdminService, private toastr: ToastersService) {
    this.categories$ = core.getAllCategories()
  }

  deleteCategory(id: Guid) {
    this.admin.deleteCategory(id).subscribe(result => {
      if (result.succeeded) {
        this.toastr.showSuccess('Success')
      } else this.toastr.showError(result.errors.reduce((a,b)=>a+" ; " + b))
    })
  }
}
