import { Component } from '@angular/core';
import {DynamicLogoComponent} from "../dynamic-logo/dynamic-logo.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    DynamicLogoComponent
  ],
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

}
