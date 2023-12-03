import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent} from "../../Shared/slider/slider.component";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [CommonModule, SliderComponent, RouterLink],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

}
