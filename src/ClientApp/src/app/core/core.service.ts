import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CategoryName} from "./Models/category-name";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  apiUrl: string = "https://localhost:7143/api/"
  constructor(private httpClient: HttpClient) { }

  getCategories() : Observable<CategoryName[]> {
    let uri = this.apiUrl + "categories";
    return this.httpClient.get<CategoryName[]>(uri)
  }
}
