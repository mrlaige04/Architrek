import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating!: number;
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }
}
