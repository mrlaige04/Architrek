import {ReportSubject} from "./ReportSubject";
import {ReportStatus} from "./ReportStatus";
import {Guid} from "guid-typescript";

export class Report {
  constructor(public id: Guid,
              public email: string,
              public subject: ReportSubject,
              public subjectText: string,
              public message: string,
              public status: ReportStatus) {
  }
}
