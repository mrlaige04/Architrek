import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ReactiveTypedFormsModule} from "@rxweb/reactive-form-validators";
import {Observable} from "rxjs";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Category} from "../../../../core/Models/category";
import {Guid} from "guid-typescript";
import {CoreService} from "../../../../core/core.service";
import {AdminService} from "../../../admin.service";
import {ToastersService} from "../../../../services/ToastersService";

@Component({
  selector: 'app-create-category-form',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveTypedFormsModule],
  templateUrl: './create-category-form.component.html',
  styleUrl: './create-category-form.component.scss'
})
export class CreateCategoryFormComponent {
  @Input({required: true}) categories$!: Observable<PaginatedList<Category>>;
  newCategoryName?: string;
  newCategoryId: Guid|undefined;
  constructor(private admin: AdminService, private toastr: ToastersService) {
  }
  createCategory() {
    if (!this.newCategoryName) {
      this.toastr.showError('Name is required')
      return;
    }
    console.log(this.newCategoryId)
    this.admin.createCategory({parentCategoryId: this.newCategoryId, name: this.newCategoryName!})
      .subscribe(res => {
        if (res as {succeeded: boolean, errors: string[]}) {
          let result = <{succeeded: boolean, errors: string[]}>res;
          if (result.succeeded) {
            this.toastr.showSuccess('Success')
          } else {
            console.log(result)
            this.toastr.showError(result.errors.reduce((a,b)=>a+" ; " + b))
          }
        }
      })
  }
}
