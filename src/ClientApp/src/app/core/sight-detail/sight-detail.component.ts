import {Component, OnInit} from '@angular/core';
import {Guid} from "guid-typescript";
import {Observable, Subscription, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CoreService} from "../core.service";
import {Sight} from "../Models/Sight";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-sight-detail',
  templateUrl: './sight-detail.component.html',
  styleUrls: ['./sight-detail.component.scss']
})
export class SightDetailComponent implements OnInit {
  id: Guid | undefined;
  sight!: Observable<Sight|undefined>;

  rating: number = 0;
  constructor(private route: ActivatedRoute, private coreService: CoreService, private asyncp: AsyncPipe) {}
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data=> this.id = Guid.parse(data));

    this.sight = this.coreService.getSightById(this.id!)

    let a = this.asyncp.transform(this.sight)
    let nums = a?.reviews.map(r=>r.rating)
    if (!nums) this.rating = 0;
    else this.rating = nums.reduce((a,b)=>a+b,0) / nums.length;
  }
}
