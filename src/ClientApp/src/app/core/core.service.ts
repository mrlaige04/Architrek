import {Inject, inject, Injectable} from '@angular/core';
import {forkJoin, switchMap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
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
import {ApiConfig} from "./providers/apiConfig.provider";


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private httpClient = inject(HttpClient)
  constructor(@Inject('API_CONFIG') private apiConfig: ApiConfig) { }

  getAllCategories(pageNumber:number = 1, pageSize:number = 10) {
    const url = this.apiConfig.apiUrl + 'categories'
    const params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)

    return this.httpClient.get<PaginatedList<Category>>(url, { params });
  }

  getAllSights(query: GetAllSightsQuery) {
    const url = this.apiConfig.apiUrl + "sights"
    const params = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize)

    return this.httpClient.get<PaginatedList<Sight>>(url, { params })
  }

  getNearSights(query: FindNearQuery, pageNumber: number = 1, pageSize: number = 10) {
    const url = this.apiConfig.apiUrl + "sights/near"
    const params = new HttpParams()
      .set('latitude', query.latitude)
      .set('longitude', query.longitude)
      .set('radius', query.radius)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)

    return this.httpClient.get<PaginatedList<Sight>>(url, { params })
  }

  getSightById(id: Guid) {
    const url = this.apiConfig.apiUrl + "sights/" + id;
    return this.httpClient.get<Sight | undefined>(url)
  }

  searchSights(filter: GetSightsFilteredQuery) {
    const url = this.apiConfig.apiUrl + "sights/filter?";
    const params = new HttpParams()
      .set("pageNumber", filter.pageNumber)
      .set("pageSize", filter.pageSize)
      .set("q", filter.query ?? '')
      .set('categoryId', filter.categoryId?.toString() ?? '')

    return this.httpClient.get<PaginatedList<Sight>>(url, { params })
  }

  reviewSight(review: AddReviewCommand, photos?: File[]) {
    const url = this.apiConfig.apiUrl + "sights/review/" + review.sightId.toString()

    const promises = photos?.map(file =>
      this.fileToBase64(file)) || [];

    if (promises.length === 0) {
      return this.httpClient.post<ApiResult>(url, review);
    }

    return forkJoin(promises)
      .pipe(
        switchMap(base64Strings => {
          review.photos = base64Strings;
          return this.httpClient.post<ApiResult>(url, review);
        })
      );
  }

  hasSightInFavorite(id: Guid) {
    const url = this.apiConfig.apiUrl + "sights/" + id.toString() + "/hasFav"
    return this.httpClient.get<boolean>(url)
  }

  sightReviews(id: Guid) {
    const url = this.apiConfig.apiUrl + "sights/" + id.toString() + "/reviews"
    return this.httpClient.get<SightReview[]>(url)
  }

  addToFavorite(id: Guid) {
    const url = this.apiConfig.apiUrl + "sights/" + id.toString() + "/favorite"
    return this.httpClient.post(url, {})
  }

  removeFromFavorite(id: Guid) {
    const url = this.apiConfig.apiUrl + "sights/" + id.toString() + "/favorite"
    return this.httpClient.delete<ApiResult>(url, {})
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
