import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sight} from "../core/Models/Sight";
import {Guid} from "guid-typescript";
import {CoreService} from "../core/core.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = "https://localhost:7143/api/user/"
  constructor(private http: HttpClient, private core: CoreService) { }

  getMyFavorites() {
    let uri = this.baseUrl+"favorites"
    return this.http.get<Array<Sight>>(uri)
  }

  removeFromFavorite(id: Guid) {
    return this.core.removeFromFavorite(id)
  }
}
