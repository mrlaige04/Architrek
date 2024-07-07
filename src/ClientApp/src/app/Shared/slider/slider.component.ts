import {Component, computed, input, Input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, MatIconButton, MatIcon],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  photos = input.required<string[]>();

  index = signal(0)
  hasNext = computed(() => this.index() < this.photos().length - 1)
  hasPrev = computed(() => this.index() > 0)

  currentImageUrl = computed(() => this.photos()[this.index()])

  next() {
    this.index.update(i => i+=1)
  }

  prev() {
    this.index.update(i => i-=1)
  }
}

export type Slide = {img:string};
