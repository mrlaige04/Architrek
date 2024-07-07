import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Guid} from "guid-typescript";
import {Observable, Subscription, switchMap} from "rxjs";
import {AsyncPipe, Location, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../core.service";
import {Sight} from "../Models/Sight";
import {AuthService} from "../../auth/auth.service";
import {SliderComponent} from "../../Shared/slider/slider.component";
import {ReviewComponent} from "../review/review.component";
import {AddReviewComponent} from "../add-review/add-review.component";
import {SightLocationRouteComponent} from "../sight-location-route/sight-location-route.component";

@Component({
  selector: 'app-sight-detail',
  standalone: true,
  templateUrl: './sight-detail.component.html',
  styleUrls: ['./sight-detail.component.scss'],
  imports: [
    SliderComponent,
    NgIf,
    NgForOf,
    ReviewComponent,
    AddReviewComponent,
    SightLocationRouteComponent,
    AsyncPipe
  ]
})
export class SightDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private location = inject(Location)
  private coreService = inject(CoreService);
  private auth = inject(AuthService);
  private subscriptions: Subscription[] = [];

  id?: Guid;
  sight?: Sight;
  photos: string[] = [];
  hasReviews = true;
  imageIndex = 0;
  rating: number = 0;

  isAuthenticated = this.auth.isAuthenticated;
  hasInFavorite?: Observable<boolean>

  ngOnInit() {
    const getIdSubscription = this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data=> {
        this.id = Guid.parse(data);
      })

    this.subscriptions.push(getIdSubscription);

    if (!this.id) {
      this.location.back()
      return;
    }

    this.hasInFavorite = this.coreService.hasSightInFavorite(this.id)

    const getSightSubscription = this.coreService.getSightById(this.id).subscribe(
      sight => {
        if (!sight) {
          this.location.back()
        } else {
          this.sight = sight;
          this.photos = this.sight.sightPhotos.map(p => p.url)
          this.coreService.sightReviews(this.id!).subscribe(reviews => {
            this.sight!.reviews = reviews;
            if (reviews && reviews.length == 0)
              this.hasReviews = false;
          })
        }
      })

    this.subscriptions.push(getSightSubscription)

    if (this.sight && this.sight.reviews) {
      let nums = this.sight.reviews.map(r=>r.rating)
      if (!nums) this.rating = 0;
      else this.rating = nums.reduce((a,b)=>a+b,0) / nums.length
    }
  }


  saveToFavorite() {
    this.coreService.addToFavorite(this.sight!.id).subscribe(data => {
      console.log(data)
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}

