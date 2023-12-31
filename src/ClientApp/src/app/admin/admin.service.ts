import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AsyncPipe} from "@angular/common";
import {User} from "./models/user";
import {Guid} from "guid-typescript";
import {Result} from "postcss";
import {ApiResult} from "../core/Models/ApiResult";
import {SynchronousPromise} from "synchronous-promise";
import {Country} from "../core/Models/Country";
import {PaginatedList} from "../core/Models/PaginatedList";
import {UrlSegment} from "@angular/router";
import {SightReview} from "../core/Models/SightReview";
import {Report} from "../Shared/report/models/Report";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = "http://localhost:5000/api/Admin/"
  private readonly isAdminSubject : BehaviorSubject<boolean>;
  isAdmin$: Observable<boolean>;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());
    this.isAdmin$ = this.isAdminSubject.asObservable();
  }

  getUsers(query: {pageNumber: number, pageSize: number}): Observable<PaginatedList<User>> {
    let uri = this.baseUrl + "users";
    let options = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize)
    return this.http.get<PaginatedList<User>>(uri, {params: options})
  }
  deleteUser(id: Guid):Observable<ApiResult> {
    let uri = this.baseUrl + 'users/' + id.toString()
    return this.http.delete<ApiResult>(uri)
  }

  isAdmin(): boolean {
    let isAdmin = false;
    let uri = this.baseUrl + "isAdmin";
    this.http.get<boolean>(uri).pipe(catchError(er=>{
      return of(false)
    }))
    return isAdmin;
  }
  get isInAdmin$(): Observable<boolean> {
    let uri = this.baseUrl + "isAdmin";
    return this.http.get<boolean>(uri)
  }



  createCategory(category: CreateCategory) {
    let uri = this.baseUrl + "categories"
    return this.http.post<ApiResult>(uri, category).pipe(catchError(err=> {
      return of({succeeded: false, errors: [err]})
    }))
  }
  deleteCategory(id: Guid) {
    let uri = this.baseUrl + "categories/" + id.toString()

    return this.http.delete<ApiResult>(uri).pipe(catchError(err=> {
      return of({succeeded: false, errors: [err]})
    }))
  }

  createSight(sight: CreateSight, photos?: Array<File>) {
    let uri = this.baseUrl + "sights"
    const convertPhotosToBase64Promises = photos?.map(file => this.fileToBase64(file)) || [];

    if (convertPhotosToBase64Promises.length === 0) {
      return this.http.post<ApiResult>(uri, sight)
    }

    return forkJoin(convertPhotosToBase64Promises)
      .pipe(
        switchMap(base64Strings => {
          sight.photos = base64Strings.map(str => {
            return {url:str}
          });

          console.log(sight)
          return this.http.post<ApiResult>(uri, sight)
        })
      )
  }
  deleteSight(id: Guid) {
    let uri = this.baseUrl + "sights/" + id.toString();
    return this.http.delete<ApiResult>(uri)
  }

  getAllCountries(pageNumber: number = 1, pageSize: number = 10) {
    let uri = this.baseUrl + "countries";
    let params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)

    return this.http.get<PaginatedList<Country>>(uri, {params: params})
  }
  createCountry(command: {name: string}) {
    let uri = this.baseUrl + "countries"
    return this.http.post<ApiResult>(uri, command)
  }
  deleteCountry(id: Guid) {
    let uri = this.baseUrl + "countries/" + id.toString()
    return this.http.delete<ApiResult>(uri)
  }

  getAllReviews(pageNumber: number = 1, pageSize: number = 10) {
    let uri = this.baseUrl + "reviews"
    let params = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)

    return this.http.get<PaginatedList<SightReview>>(uri, {params: params})
  }
  deleteReview(id: Guid) {
    let uri = this.baseUrl + "reviews/" + id.toString()
    return this.http.delete<ApiResult>(uri)
  }

  getAllReports(pageNumber: number = 1, pageSize: number = 10) {
    let uri = this.baseUrl + "reports";
    let params = new HttpParams()
        .set("pageNumber", pageNumber)
        .set("pageSize", pageSize)

    return this.http.get<PaginatedList<Report>>(uri, {params: params})
  }

  deleteReport(id: Guid) {
    let uri = this.baseUrl + "reports/" + id.toString()
    return this.http.delete<ApiResult>(uri)
  }

  setActiveReport(id: Guid) {
    let uri = this.baseUrl + "reports/" + id.toString()
    return this.http.post<ApiResult>(uri, {})
  }

  rejectReport(id: Guid) {
    let uri = this.baseUrl + "reports/" + id.toString() + "/rejects"
    return this.http.post<ApiResult>(uri, {})
  }

  answerReport(id: Guid, message: string) {
    let uri = this.baseUrl + "reports/answers"
    return this.http.post<ApiResult>(uri, {id: id, message: message})
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

