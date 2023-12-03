import {Component, Input} from '@angular/core';
import {Sight} from "../Models/Sight";

@Component({
  selector: 'app-search-sight-card',
  templateUrl: './search-sight-card.component.html',
  styleUrls: ['./search-sight-card.component.scss']
})
export class SearchSightCardComponent {
  @Input() sight!: Sight;
}
