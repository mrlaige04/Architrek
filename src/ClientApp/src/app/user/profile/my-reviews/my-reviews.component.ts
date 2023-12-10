import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user.service";
import {Guid} from "guid-typescript";
import {Observable} from "rxjs";
import {DataResult} from "../../../core/Models/DataResult";
import {PaginatedList} from "../../../core/Models/PaginatedList";
import {SightReview} from "../../../core/Models/SightReview";
import {RouterLink} from "@angular/router";
import {CoreModule} from "../../../core/core.module";
import {EditReviewComponent} from "./edit-review/edit-review.component";
import {
  CreateCategoryFormComponent
} from "../../../admin/admin-menu/category/create-category-form/create-category-form.component";
import {Modal} from "flowbite";
import {modalOptions} from "../../../admin/admin-menu/category/category-list/category-list.component";
import {StarRatingComponent} from "../../../core/star-rating/star-rating.component";
import {ToastersService} from "../../../services/ToastersService";

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink, CoreModule, EditReviewComponent, CreateCategoryFormComponent, StarRatingComponent],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.scss'
})
export class MyReviewsComponent implements AfterViewInit{
  pageNumber = 1;
  pageSize = 10;

  isEditingMode = false;
  editingReview? : SightReview;

  reviews$: Observable<DataResult<PaginatedList<SightReview>>>


  @ViewChild("editReviewModal") element?: ElementRef;

  modal = new Modal(
    null,
    modalOptions
  )

  ngAfterViewInit() {
    this.modal._targetEl = this.element?.nativeElement
  }

  constructor(private user: UserService, private toastr: ToastersService) {
    this.reviews$ = this.user.getReviews(this.pageNumber, this.pageSize)
  }

  getReviews() {
    this.reviews$ = this.user.getReviews(this.pageNumber, this.pageSize)
  }

  editReview(review: SightReview) {
    this.isEditingMode = false;
    this.editingReview = review;
    this.modal.show()
  }

  saveReview(edited: boolean) {
    this.modal.hide()
    if (edited) {
      this.getReviews()
      this.toastr.showSuccess('Successfully edited review')
    }
  }

  deleteReview(id: Guid) {
    this.user.deleteReview(id).subscribe({
      next: result => {
        if (result.succeeded) {
          this.getReviews()
        }
      },
      error: err => {}
    })
  }

  nextPage() {
    this.pageNumber++;
    this.getReviews()
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getReviews()
    }
  }
}
