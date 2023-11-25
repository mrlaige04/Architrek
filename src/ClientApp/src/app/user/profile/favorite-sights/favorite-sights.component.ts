import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../user.service";
import {Observable} from "rxjs";
import {Sight} from "../../../core/Models/Sight";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-favorite-sights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-sights.component.html',
  styleUrl: './favorite-sights.component.scss'
})
export class FavoriteSightsComponent {
  sights$: Observable<Sight[]>;
  constructor(private userService: UserService) {
    this.sights$ = userService.getMyFavorites()
  }

  removeFromFavorite(id: Guid) {
    this.userService.removeFromFavorite(id).subscribe(data=> {
      console.log(data)
    })
  }
}
