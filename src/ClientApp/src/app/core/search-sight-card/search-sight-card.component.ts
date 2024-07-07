import {Component, Input} from '@angular/core';
import {Sight} from "../Models/Sight";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search-sight-card',
  standalone: true,
  templateUrl: './search-sight-card.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatChipSet,
    MatChip,
    MatCardActions,
    MatAnchor,
    RouterLink
  ],
  styleUrls: ['./search-sight-card.component.scss']
})
export class SearchSightCardComponent {
  @Input() sight!: Sight;
}
