import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AsyncPipe} from "@angular/common";
import {User} from "./models/user";
import {Guid} from "guid-typescript";

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
    this.http.get<boolean>(uri).pipe()
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
}
