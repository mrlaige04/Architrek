import { Injectable } from '@angular/core';
import {EMPTY, forkJoin, Observable, switchMap} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Category} from "./Models/category";
import {GetAllSightsQuery} from "./cqrs/sights/getSights/getAllSights/GetAllSightsQuery";
import {PaginatedList} from "./Models/PaginatedList";
import {Sight} from "./Models/Sight";
import {Guid} from "guid-typescript";
import {GetSightsFilteredQuery} from "./cqrs/sights/getSights/getSightsFilteredQuery";
import {AddReviewCommand} from "./cqrs/sights/reviews/addreview/addReviewCommand";
import {SynchronousPromise} from "synchronous-promise";
import {SightReview} from "./Models/SightReview";
import {ApiResult} from "./Models/ApiResult";
import {FindNearQuery} from "./search-page/search-page.component";
import {request} from "express";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  apiUrl: string = "https://localhost:7143/api/"
  constructor(private httpClient: HttpClient) { }

  getAllCategories(pageNumber:number = 1, pageSize:number = 10): Observable<PaginatedList<Category>> {
    let uri = this.apiUrl + "categories";
    let params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)

    return this.httpClient.get<PaginatedList<Category>>(uri, {params: params});
  }

  getAllSights(query: GetAllSightsQuery): Observable<PaginatedList<Sight>> {
    let uri = this.apiUrl + "sights"
    let options = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize)
    return this.httpClient.get<PaginatedList<Sight>>(uri, {params: options})
  }

  getNearSights(query: FindNearQuery, pageNumber: number = 1, pageSize: number = 10) {
    let uri = this.apiUrl + "sights/near"
    let params = new HttpParams()
      .set('latitude', query.latitude)
      .set('longitude', query.longitude)
      .set('radius', query.radius)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)

    return this.httpClient.get<PaginatedList<Sight>>(uri, {params: params})
  }

  getSightById(id: Guid) {
    let uri = this.apiUrl + "sights/" + id;
    return this.httpClient.get<Sight|undefined>(uri)
  }

  searchSights(filter: GetSightsFilteredQuery) {
    let uri = this.apiUrl + "Sights/filter?";
    if (filter.query && filter.query.length > 1)
      uri += `q=${filter.query}`;

    if (filter.categoryId && filter.categoryId.toString() != 'undefined' && this.isGuid(filter.categoryId.toString()))
      uri += `&categoryId=${filter.categoryId.toString()}`;

    uri += `&pageNumber=${filter.pageNumber}&pageSize=${filter.pageSize}`
    return this.httpClient.get<PaginatedList<Sight>>(uri)
  }

  reviewSight(review: AddReviewCommand, photos?: File[]) {
    let uri = this.apiUrl + "Sights/review/" + review.sightId.toString()

    const promises = photos?.map(file => this.fileToBase64(file)) || [];

    if (promises.length === 0) {
      return this.httpClient.post<ApiResult>(uri, review);
    }

    return forkJoin(promises)
      .pipe(
        switchMap(base64Strings => {
          review.photos = base64Strings;
          return this.httpClient.post<ApiResult>(uri, review);
        })
      );
  }

  hasSightInFavorite(id: Guid) {
    let uri = this.apiUrl + "Sights/" + id.toString() + "/hasFav"
    return this.httpClient.get<boolean>(uri)
  }

  sightReviews(id: Guid) {
    let uri = this.apiUrl + "Sights/" + id.toString() + "/reviews"
    return this.httpClient.get<SightReview[]>(uri)
  }

  addToFavorite(id: Guid) {
    let uri = this.apiUrl + "Sights/" + id.toString() + "/favorite"
    return this.httpClient.post(uri, {})
  }

  removeFromFavorite(id: Guid) {
    let uri = this.apiUrl + "Sights/" + id.toString() + "/favorite"
    return this.httpClient.delete<ApiResult>(uri, {})
  }


  private fileToBase64(file: File) {
    return new SynchronousPromise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(<string>reader.result);
      reader.onerror = reject;
    });
  }
  private isGuid(text: string) {
    try {
      Guid.parse(text);
      return true;
    } catch {
      return false;
    }
  }

}
