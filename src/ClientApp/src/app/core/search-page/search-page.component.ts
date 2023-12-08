import { Component } from '@angular/core';
import {CoreService} from "../core.service";
import {Observable} from "rxjs";
import {PaginatedList} from "../Models/PaginatedList";
import {Sight} from "../Models/Sight";
import {Category} from "../Models/category";
import {core} from "@angular/compiler";
import {Guid} from "guid-typescript";
import {DistanceUnit} from "../Models/DistanceUnit";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public selectedCategory: Guid | undefined = undefined;
  public categories: Observable<PaginatedList<Category>>;
  public sights: Observable<PaginatedList<Sight>>;

  public query?: string;

  public pageNumber: number = 1;
  public pagesCount: number = 10;

  findNearForm: FormGroup;

  constructor(private coreService: CoreService, private fb: FormBuilder) {
    this.categories = coreService.getAllCategories()
    this.sights = coreService.getAllSights({pageSize: this.pagesCount, pageNumber: this.pageNumber})

    this.findNearForm = fb.group({
      radius: new FormControl(0, [Validators.required, RxwebValidators.numeric()]),
    })
  }

  searchSubmit() {
    this.sights = this.coreService.searchSights({
      pageSize: this.pagesCount,
      pageNumber: this.pageNumber,
      categoryId: this.selectedCategory,
      query: this.query ?? ''
    })
  }

  prevPage() {
    this.pageNumber--;
    this.sights = this.coreService.getAllSights({pageSize: this.pagesCount, pageNumber: this.pageNumber})
  }

  exactPage(page: number) {
    this.pageNumber = page+1;
    this.sights = this.coreService.getAllSights({pageSize: this.pagesCount, pageNumber: this.pageNumber})
  }

  nextPage() {
    this.pageNumber++;
    this.sights = this.coreService.getAllSights({pageSize: this.pagesCount, pageNumber: this.pageNumber})
  }

  findNear() {
    if (this.findNearForm.valid) {
      const radius = this.findNearForm.value['radius']
      navigator.geolocation.getCurrentPosition(pos => {
        const geo = pos.coords;
        this.sights = this.coreService.getNearSights({radius: radius, longitude: geo.longitude, latitude: geo.latitude}, this.pageNumber, this.pagesCount)
      })
    }
  }

  protected readonly Array = Array;
  protected readonly undefined = undefined;
}

export type FindNearQuery = {
  radius: number,
  latitude: number,
  longitude: number
}
