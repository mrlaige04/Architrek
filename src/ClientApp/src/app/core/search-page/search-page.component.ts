import { Component } from '@angular/core';
import {CoreService} from "../core.service";
import {CategoryName} from "../Models/category-name";
import {Observable} from "rxjs";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public selectedCategory: CategoryName | null = null;

  public categories: Observable<CategoryName[]>;
  constructor(private coreService: CoreService) {
    this.categories = coreService.getCategories()
  }

  onSelect(event: Event) {
    console.log(this.selectedCategory)
  }
}
