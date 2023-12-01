import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sight} from "../core/Models/Sight";
import {Guid} from "guid-typescript";
import {CoreService} from "../core/core.service";
import {DataResult} from "../core/Models/DataResult";
import {UserProfile} from "./models/UserProfile";
import {SynchronousPromise} from "synchronous-promise";
import {forkJoin, switchMap} from "rxjs";
import {ApiResult} from "../core/Models/ApiResult";


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

  getProfile() {
    let uri = this.baseUrl + "profile"
    return this.http.get<DataResult<UserProfile>>(uri)
  }

  setAvatar(file: File) {
    const promise = this.fileToBase64(file)
    return forkJoin([promise]).pipe(
        switchMap(photo => {
          let uri = this.baseUrl + "avatar";
          return this.http.post<ApiResult>(uri, {url: photo.at(0)})
        }
    ))
  }

  removeAvatar() {
    let uri = this.baseUrl + "avatar"
    return this.http.delete<ApiResult>(uri)
  }

  private fileToBase64(file: File) {
    return new SynchronousPromise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(<string>reader.result);
      reader.onerror = reject;
    });
  }
}
