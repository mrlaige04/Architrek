import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AsyncPipe} from "@angular/common";
import {User} from "./models/user";
import {Guid} from "guid-typescript";
import {Result} from "postcss";
import {ApiResult} from "../core/Models/ApiResult";

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

  get users(): Observable<User[]> {
    let uri = this.baseUrl + "users";
    return this.http.get<User[]>(uri)
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
}

export type CreateCategory = {name: string, parentCategoryId?: Guid}
