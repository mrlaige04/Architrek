import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
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
import {Modal, ModalOptions} from "flowbite";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateCategoryFormComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements AfterViewInit{
  categories$: Observable<PaginatedList<Category>>;
  pageNumber = 1;
  pageSize = 10;

  @ViewChild("addCategoryModal") element?: ElementRef;

  modal = new Modal(
      null,
      AdminModalOptions
  )
  constructor(private core: CoreService, private admin: AdminService, private toastr: ToastersService) {
    this.categories$ = core.getAllCategories()
  }

  ngAfterViewInit() {
    this.modal._targetEl = this.element?.nativeElement
  }

  openModal() {
    this.modal._targetEl = document.querySelector("#add-category-modal");
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
  }

  getCategories() {
    this.categories$ = this.core.getAllCategories(this.pageNumber, this.pageSize)
  }

  deleteCategory(id: Guid) {
    this.admin.deleteCategory(id).subscribe(result => {
      if (result.succeeded) {
        this.toastr.showSuccess('Success')
      } else this.toastr.showError(result.errors.reduce((a,b)=>a+" ; " + b))
    })
  }

  nextPage() {
    this.pageNumber++;
    this.getCategories()
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getCategories()
    }
  }
}

export const AdminModalOptions: ModalOptions = {placement: 'center', backdrop: "static", closable: true}
