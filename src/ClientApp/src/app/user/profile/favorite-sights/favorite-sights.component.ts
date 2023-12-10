import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user.service";
import {Observable} from "rxjs";
import {Sight} from "../../../core/Models/Sight";
import {Guid} from "guid-typescript";
import {DataResult} from "../../../core/Models/DataResult";
import {PaginatedList} from "../../../core/Models/PaginatedList";
import {data} from "autoprefixer";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-favorite-sights',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorite-sights.component.html',
  styleUrl: './favorite-sights.component.scss'
})
export class FavoriteSightsComponent {
  sights$: Observable<DataResult<PaginatedList<Sight>>>;
  pageNumber = 1
  pageSize = 10
  constructor(private userService: UserService) {
    this.sights$ = userService.getMyFavorites()
  }

  getFavorites() {
    this.sights$ = this.userService.getMyFavorites(this.pageNumber, this.pageSize)
  }

  removeFromFavorite(id: Guid) {
    this.userService.removeFromFavorite(id).subscribe(data=> {
      if (data.succeeded) {
        this.getFavorites()
      }
    })
  }

  nextPage() {
    this.pageNumber++;
    this.getFavorites()
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getFavorites()
    }
  }

  protected readonly data = data;
}
