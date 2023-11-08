import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Category} from "./Models/category";
import {GetAllSightsQuery} from "./cqrs/sights/getSights/getAllSights/GetAllSightsQuery";
import {PaginatedList} from "./Models/PaginatedList";
import {Sight} from "./Models/Sight";
import {Guid} from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  apiUrl: string = "https://localhost:7143/api/"
  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    let uri = this.apiUrl + "categories";
    return this.httpClient.get<Category[]>(uri);
  }

  getAllSights(query: GetAllSightsQuery): Observable<PaginatedList<Sight>> {
    let uri = this.apiUrl + "sights"
    let options = new HttpParams()
      .set('pageNumber', query.pageNumber)
      .set('pageSize', query.pageSize)
    return this.httpClient.get<PaginatedList<Sight>>(uri, {params: options})
  }

  getSightById(id: Guid) {
    let uri = this.apiUrl + "sights/" + id;
    return this.httpClient.get<Sight|undefined>(uri)
  }

  searchSights() {

  }
}
