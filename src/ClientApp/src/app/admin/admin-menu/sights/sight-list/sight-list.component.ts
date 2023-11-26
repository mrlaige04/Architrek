import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateCategoryFormComponent} from "../../category/create-category-form/create-category-form.component";
import {CreateSightFormComponent} from "../create-sight-form/create-sight-form.component";
import {CoreService} from "../../../../core/core.service";
import {Observable} from "rxjs";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Sight} from "../../../../core/Models/Sight";
import {Guid} from "guid-typescript";
import {AdminService} from "../../../admin.service";

@Component({
  selector: 'app-sight-list',
  standalone: true,
  imports: [CommonModule, CreateCategoryFormComponent, CreateSightFormComponent],
  templateUrl: './sight-list.component.html',
  styleUrl: './sight-list.component.scss'
})
export class SightListComponent {
  sights$: Observable<PaginatedList<Sight>>

  pageNumber= 1;
  pageSize = 10;
  constructor(private core: CoreService, private admin: AdminService) {
    this.sights$ = core.getAllSights({pageNumber: this.pageNumber, pageSize: this.pageSize})
  }

  getSights() {
    this.sights$ = this.core.getAllSights({pageNumber: this.pageNumber, pageSize: this.pageSize})
  }

  nextPage() {
    this.pageNumber++;
    this.getSights()
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getSights()
    }
  }

  deleteSight(id: Guid) {
    this.admin.deleteSight(id).subscribe(res => {
      if (res.succeeded) {
        this.getSights()
      }
    })
  }
}
