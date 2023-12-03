import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SlickCarouselModule} from "ngx-slick-carousel";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input({required: true}) slides!: Slide[];

  @Input() slideConfig: any;
}

export type Slide = {img:string};
