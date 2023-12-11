import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating!: number;
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
}
