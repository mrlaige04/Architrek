import { Component } from '@angular/core';
import {CoreService} from "../core.service";
import {Observable} from "rxjs";
import {PaginatedList} from "../Models/PaginatedList";
import {Sight} from "../Models/Sight";
import {Category} from "../Models/category";
import {core} from "@angular/compiler";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public selectedCategory: Category | null = null;
  public categories: Observable<Category[]>;
  public sights: Observable<PaginatedList<Sight>>;

  public pageNumber: number = 1;
  public pagesCount: number = 10;

  constructor(private coreService: CoreService) {
    this.categories = coreService.getAllCategories()

    this.sights = coreService.getAllSights({pageSize: this.pagesCount, pageNumber: this.pageNumber})
  }

  searchSubmit() {
    this.coreService.searchSights()
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

  protected readonly Array = Array;
}
