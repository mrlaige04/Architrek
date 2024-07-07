import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SightReview} from "../Models/SightReview";
import {StarRatingComponent} from "../star-rating/star-rating.component";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent{
  @Input({required:true}) review!: SightReview;
}
