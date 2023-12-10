import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateCategoryFormComponent} from "../../category/create-category-form/create-category-form.component";
import {Observable} from "rxjs";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {SightReview} from "../../../../core/Models/SightReview";
import {AdminService} from "../../../admin.service";
import {Guid} from "guid-typescript";
import {RouterLink} from "@angular/router";
import {CoreModule} from "../../../../core/core.module";
import {StarRatingComponent} from "../../../../core/star-rating/star-rating.component";

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, CreateCategoryFormComponent, RouterLink, CoreModule, StarRatingComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  reviews$: Observable<PaginatedList<SightReview>>
  pageNumber = 1;
  pageSize = 10;

  constructor(private admin: AdminService) {
    this.reviews$ = admin.getAllReviews()
  }

  getReviews() {
    this.reviews$ = this.admin.getAllReviews(this.pageNumber, this.pageSize)
  }

  deleteReview(id: Guid) {
    this.admin.deleteReview(id).subscribe(result => {
      if (result.succeeded) {
        this.getReviews()
      }
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
