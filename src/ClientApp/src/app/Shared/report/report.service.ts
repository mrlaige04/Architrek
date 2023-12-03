import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReportSubject} from "./models/ReportSubject";
import {Report} from "./models/Report";
import {ApiResult} from "../../core/Models/ApiResult";
import {ReportStatus} from "./models/ReportStatus";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUri = "https://localhost:7143/api/reports/"
  constructor(private http: HttpClient) { }

  getSubjects() {
    let uri = this.baseUri + "subjects"
    return this.http.get<Map<ReportSubject, string>>(uri)
  }

  getStatuses() {
    let uri = this.baseUri + "statuses"
    return this.http.get<Map<ReportStatus, string>>(uri)
  }

  createReport(report: Report) {
    let uri = this.baseUri;
    return this.http.post<ApiResult>(uri, report)
  }
}
