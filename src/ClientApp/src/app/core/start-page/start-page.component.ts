import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Slide, SliderComponent} from "../../Shared/slider/slider.component";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  mainSliderConfig = {
    autoplay: true,

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  images: Slide[] = [
    {img:'https://cdn.britannica.com/18/194818-050-E7A7A993/view-Kiev-Ukraine.jpg'},
    {img:'https://ukraine.ua/wp-content/uploads/2020/09/Lviv-market-square.Ruslan-Lytvyn.shutterstock-1536x1024.jpg'}
  ]
}
