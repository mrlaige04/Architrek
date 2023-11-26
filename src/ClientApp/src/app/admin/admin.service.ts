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

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = "https://localhost:7143/api/Admin/"
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

  deleteUser(id: Guid) {
    let uri = this.baseUrl + 'users/' + id.toString()
    return this.http.delete<boolean>(uri)
  }

  createCategory(category: CreateCategory) {
    let uri = this.baseUrl + "category"
    return this.http.post<Result>(uri, category).pipe(catchError(err=> {
      return of({succeeded: false, errors: [err]})
    }))
  }

  deleteCategory(id: Guid) {
    let uri = this.baseUrl + "category/" + id.toString()
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

  getAllCountries() {
    let uri = this.baseUrl + "countries";
    return this.http.get<Array<Country>>(uri)
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
