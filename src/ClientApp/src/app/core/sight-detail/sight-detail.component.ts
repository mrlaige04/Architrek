import {Component, OnInit} from '@angular/core';
import {Guid} from "guid-typescript";
import {Observable, switchMap} from "rxjs";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../core.service";
import {Sight} from "../Models/Sight";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sight-detail',
  templateUrl: './sight-detail.component.html',
  styleUrls: ['./sight-detail.component.scss'],
})
export class SightDetailComponent implements OnInit {
  id?: Guid;
  sight?: Sight;

  hasReviews = true;

  imageIndex = 0;

  rating: number = 0;
  isAuthenticated$: Observable<boolean>
  hasInFavorite?: Observable<boolean>
  constructor(private route: ActivatedRoute,
              private location: Location,
              private coreService: CoreService,
              private auth: AuthService
              ) {

    this.isAuthenticated$ = auth.isAuthenticated$
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data=> {
        this.id = Guid.parse(data);
      })

    if (!this.id) {
      this.location.back()
      return;
    }
    this.hasInFavorite = this.coreService.hasSightInFavorite(this.id)
    this.coreService.getSightById(this.id).subscribe(
      sight => {
        if (!sight) {
          this.location.back()
        } else {
          this.sight = sight;
          this.coreService.sightReviews(this.id!).subscribe(reviews => {
            this.sight!.reviews = reviews;
            if (reviews && reviews.length == 0)
              this.hasReviews = false;
          })
        }
      })

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
}

