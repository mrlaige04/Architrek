import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchSightCardComponent } from './search-sight-card/search-sight-card.component';
import { SightDetailComponent } from './sight-detail/sight-detail.component';
import {RouterLink} from "@angular/router";
import { StarRatingComponent } from './star-rating/star-rating.component';
import {ReviewComponent} from "./review/review.component";
import {AddReviewComponent} from "./add-review/add-review.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {SightLocationRouteComponent} from "./sight-location-route/sight-location-route.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatAnchor} from "@angular/material/button";



@NgModule({
    declarations: [
        SearchPageComponent,
        SearchSightCardComponent,
        SightDetailComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReviewComponent,
    AddReviewComponent,
    NgxSpinnerModule,
    SightLocationRouteComponent,
    ReactiveFormsModule,
    StarRatingComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatChipSet,
    MatChip,
    MatCardActions,
    MatAnchor
  ],
    exports: [

    ],
    providers: [AsyncPipe]
})
export class CoreModule { }
