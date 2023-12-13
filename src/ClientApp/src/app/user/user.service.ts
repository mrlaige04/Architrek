import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Sight} from "../core/Models/Sight";
import {Guid} from "guid-typescript";
import {CoreService} from "../core/core.service";
import {DataResult} from "../core/Models/DataResult";
import {UserProfile} from "./models/UserProfile";
import {SynchronousPromise} from "synchronous-promise";
import {forkJoin, switchMap} from "rxjs";
import {ApiResult} from "../core/Models/ApiResult";
import {PaginatedList} from "../core/Models/PaginatedList";
import {SightReview} from "../core/Models/SightReview";
import {EditReview} from "./profile/my-reviews/edit-review/edit-review.component";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = "http://localhost:5000/api/user/"
  constructor(private http: HttpClient, private core: CoreService) { }

  getMyFavorites(pageNumber: number = 1, pageSize: number = 10) {
    let uri = this.baseUrl+"favorites"
    let params = new HttpParams()
        .set("pageNumber", pageNumber)
        .set("pageSize", pageSize)

    return this.http.get<DataResult<PaginatedList<Sight>>>(uri, {params: params})
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

  getReviews(pageNumber: number = 1, pageSize: number = 10) {
    let uri = this.baseUrl + "reviews"
    let params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)
    return this.http.get<DataResult<PaginatedList<SightReview>>>(uri, {params: params})
  }

  deleteReview(id: Guid) {
    let uri = this.baseUrl + "reviews/" + id.toString()
    return this.http.delete<ApiResult>(uri)
  }

  /*changeReviewText(change: ChangeReviewText) {
    let uri = this.baseUrl + "reviews/" + change.id.toString()
    return this.http.post<ApiResult>(uri, change)
  }*/

  editReview(id: Guid, edit: EditReview, photos: { add: Array<File>, remove: Array<Guid> }) {
    let uri = this.baseUrl + "reviews/" + id.toString()

    let photosReq: {add: Array<string>, remove: Array<Guid>} = {
      add: [],
      remove: []
    };
    photosReq.remove = photos.remove;

    if (photos.add.length == 0) {
      return this.http.post<ApiResult>(uri, {
        id: id, text: edit.text, rating: edit.rating, photos: {
          add: photosReq.add,
          remove: photosReq.remove
        }
      })
    }
    let promises = photos.add.map(file => this.fileToBase64(file)) || [];

    return forkJoin(promises)
      .pipe(
        switchMap(base64Strings => {
          photosReq.add = base64Strings;
          console.log(edit)
          const body = {
            id: id, text: edit.text, rating: edit.rating, photos: {
              add: photosReq.add,
              remove: photosReq.remove
            }
          }
          console.log(body)
          return this.http.post<ApiResult>(uri, body);
        })
      );
  }

  deleteAccount() {
    let uri = this.baseUrl + "account"
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

export type ChangeReviewText = {id: Guid, text?: string}
