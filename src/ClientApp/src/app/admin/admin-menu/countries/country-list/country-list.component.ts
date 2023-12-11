import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateCategoryFormComponent} from "../../category/create-category-form/create-category-form.component";
import {AdminService} from "../../../admin.service";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Country} from "../../../../core/Models/Country";
import {Observable} from "rxjs";
import {CreateCountryFormComponent} from "../create-country-form/create-country-form.component";
import {Guid} from "guid-typescript";
import {Modal} from "flowbite";
import {modalOptions} from "../../category/category-list/category-list.component";

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CreateCategoryFormComponent, CreateCountryFormComponent],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements AfterViewInit {
  countries$: Observable<PaginatedList<Country>>;
  pageNumber = 1;
  pageSize = 10;
  @ViewChild('addCountryModal') element?: ElementRef

  modal = new Modal(null, modalOptions)
  constructor(private admin: AdminService) {
    this.countries$ = admin.getAllCountries(this.pageNumber, this.pageSize)
  }


  ngAfterViewInit() {
    this.modal._targetEl = this.element?.nativeElement
  }

  openModal() {
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
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
