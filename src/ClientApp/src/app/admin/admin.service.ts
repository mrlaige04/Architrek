import {inject, Inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, forkJoin, of, switchMap} from "rxjs";
import {User} from "./models/user";
import {Guid} from "guid-typescript";
import {ApiResult} from "../core/Models/ApiResult";
import {SynchronousPromise} from "synchronous-promise";
import {Country} from "../core/Models/Country";
import {PaginatedList} from "../core/Models/PaginatedList";
import {SightReview} from "../core/Models/SightReview";
import {Report} from "../Shared/report/models/Report";
import {ApiConfig} from "../core/providers/apiConfig.provider";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient)
  baseUrl: string;

  constructor(@Inject('API_CONFIG') apiConfig: ApiConfig) {
    this.baseUrl = apiConfig.apiUrl + 'admin/'
    this.isAdmin = toSignal(this.isUserAdmin())
  }

  isAdmin: Signal<boolean | undefined>;

  getUsers(pageNumber: number, pageSize: number) {
    const url = this.baseUrl + "users";
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize)

    return this.http.get<PaginatedList<User>>(url, { params })
  }

  deleteUser(id: Guid) {
    const url = this.baseUrl + 'users/' + id.toString()
    return this.http.delete<ApiResult>(url)
  }

  isUserAdmin() {
    const url = this.baseUrl + "isAdmin";
    return this.http.get<boolean>(url)
  }

  createCategory(category: CreateCategory) {
    const url = this.baseUrl + "categories"
    return this.http.post<ApiResult>(url, category)
      .pipe(catchError(err=> {
        return of({succeeded: false, errors: [err]})
      }))
  }

  deleteCategory(id: Guid) {
    const url = this.baseUrl + "categories/" + id.toString()

    return this.http.delete<ApiResult>(url)
      .pipe(catchError(err=> {
        return of({succeeded: false, errors: [err]})
      }))
  }

  createSight(sight: CreateSight, photos?: Array<File>) {
    const url = this.baseUrl + "sights"
    const convertPhotosToBase64Promises =
      photos?.map(file =>
        this.fileToBase64(file)) || [];

    if (convertPhotosToBase64Promises.length === 0) {
      return this.http.post<ApiResult>(url, sight)
    }

    return forkJoin(convertPhotosToBase64Promises)
      .pipe(
        switchMap(base64Strings => {
          sight.photos = base64Strings.map(str => {
            return {url:str}
          });

          console.log(sight)
          return this.http.post<ApiResult>(url, sight)
        })
      )
  }
  deleteSight(id: Guid) {
    const url = this.baseUrl + "sights/" + id.toString();
    return this.http.delete<ApiResult>(url)
  }

  getAllCountries(pageNumber: number = 1, pageSize: number = 10) {
    const url = this.baseUrl + "countries";
    const params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)

    return this.http.get<PaginatedList<Country>>(url, { params })
  }

  createCountry(name: string) {
    const url = this.baseUrl + "countries"
    return this.http.post<ApiResult>(url, { name })
  }

  deleteCountry(id: Guid) {
    const url = this.baseUrl + "countries/" + id.toString()
    return this.http.delete<ApiResult>(url)
  }

  getAllReviews(pageNumber: number, pageSize: number) {
    const url = this.baseUrl + "reviews"
    const params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)

    return this.http.get<PaginatedList<SightReview>>(url, { params })
  }

  deleteReview(id: Guid) {
    const url = this.baseUrl + "reviews/" + id.toString()
    return this.http.delete<ApiResult>(url)
  }

  getAllReports(pageNumber: number, pageSize: number) {
    const url = this.baseUrl + "reports";
    const params = new HttpParams()
        .set("pageNumber", pageNumber)
        .set("pageSize", pageSize)

    return this.http.get<PaginatedList<Report>>(url, { params })
  }

  deleteReport(id: Guid) {
    const url = this.baseUrl + "reports/" + id.toString()
    return this.http.delete<ApiResult>(url)
  }

  setActiveReport(id: Guid) {
    const url = this.baseUrl + "reports/" + id.toString()
    return this.http.post<ApiResult>(url, {})
  }

  rejectReport(id: Guid) {
    const url = this.baseUrl + "reports/" + id.toString() + "/rejects"
    return this.http.post<ApiResult>(url, {})
  }

  answerReport(id: Guid, message: string) {
    const url = this.baseUrl + "reports/answers"
    return this.http.post<ApiResult>(url, { id, message })
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

export type CreateCategory = {name: string, parentCategoryId?: Guid}
export type CreateSight = {
  name: string,
  description?: string,
  infoBlocks?: Array<{title: string, text: string}>,
  categoryId: Guid,
  tags?: Array<{name: string}>,
  photos?: Array<{ url: string }>,
  location: {countryId: Guid, latitude: number, longitude: number}
}

