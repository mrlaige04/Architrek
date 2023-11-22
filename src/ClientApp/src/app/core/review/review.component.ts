import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SightReview} from "../Models/SightReview";
import {CoreService} from "../core.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent{
  @Input({required:true}) review!: SightReview;
}
