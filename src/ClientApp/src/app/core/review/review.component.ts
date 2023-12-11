import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SightReview} from "../Models/SightReview";
import {CoreService} from "../core.service";
import {tap} from "rxjs";
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
