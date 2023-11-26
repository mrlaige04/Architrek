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

/*  newCategoryName?: string;
  newCategoryId: Guid|undefined;*/
  constructor(private core: CoreService, private admin: AdminService, private toastr: ToastersService) {
    this.categories$ = core.getAllCategories()
  }

 /* createCategory() {
    if (!this.newCategoryName) {
      this.toastr.showError('Name is required')
      return;
    }

    this.admin.createCategory({parentCategoryId: this.newCategoryId, name: this.newCategoryName!})
      .subscribe(res => {
        if (res as {succeeded: boolean, errors: string[]}) {
          let result = <{succeeded: boolean, errors: string[]}>res;
          if (result.succeeded) {
            this.toastr.showSuccess('Success')
          } else {
            this.toastr.showError(result.errors.reduce((a,b)=>a+" ; " + b))
          }
        }
      })
  }*/

  deleteCategory(id: Guid) {
    this.admin.deleteCategory(id).subscribe(result => {
      if (result.succeeded) {
        this.toastr.showSuccess('Success')
      } else this.toastr.showError(result.errors.reduce((a,b)=>a+" ; " + b))
    })
  }
}
