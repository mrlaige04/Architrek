import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateCategoryFormComponent} from "../../category/create-category-form/create-category-form.component";
import {AdminService} from "../../../admin.service";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Country} from "../../../../core/Models/Country";
import {Observable} from "rxjs";
import {CreateCountryFormComponent} from "../create-country-form/create-country-form.component";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CreateCategoryFormComponent, CreateCountryFormComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent {
  countries$: Observable<PaginatedList<Country>>;
  pageNumber = 1;
  pageSize = 10;
  constructor(private admin: AdminService) {
    this.countries$ = admin.getAllCountries(this.pageNumber, this.pageSize)
  }

  getCountries() {
    this.countries$ = this.admin.getAllCountries(this.pageNumber, this.pageSize)
  }

  prevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getCountries()
    }
  }

  nextPage() {
    this.pageNumber++;
    this.getCountries()
  }

  deleteCountry(id: Guid) {
    this.admin.deleteCountry(id).subscribe(data=>{
      if (data.succeeded) this.getCountries()
    })
  }
}
