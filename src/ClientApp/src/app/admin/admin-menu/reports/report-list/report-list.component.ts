import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminService} from "../../../admin.service";
import {Observable} from "rxjs";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Report} from "../../../../Shared/report/models/Report";
import {ReportService} from "../../../../Shared/report/report.service";
import {ReportSubject} from "../../../../Shared/report/models/ReportSubject";
import {ReportStatus} from "../../../../Shared/report/models/ReportStatus";
import {Guid} from "guid-typescript";
import {AnswerReportFormComponent} from "../answer-report-form/answer-report-form.component";
import {modalOptions} from "../../category/category-list/category-list.component";
import {Modal} from "flowbite";

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, AnswerReportFormComponent],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.scss'
})
export class ReportListComponent implements AfterViewInit{
  reports$: Observable<PaginatedList<Report>>;
  pageNumber = 1;
  pageSize = 10;

  subjects$: Observable<any>
  statuses$: Observable<any>

  activeAnswerReportId?: Guid;

  @ViewChild('answerForm') answerForm?: ElementRef

  modal = new Modal(null, modalOptions)
  constructor(private admin: AdminService, private report: ReportService) {
    this.reports$ = admin.getAllReports()
    this.subjects$ = report.getSubjects()
    this.statuses$ = report.getStatuses()
  }

  ngAfterViewInit() {
    this.modal._targetEl = this.answerForm?.nativeElement
  }

  openModal(id: Guid) {
    this.activeAnswerReportId = id;
    this.modal.show()
  }

  closeModal() {
    this.modal.hide()
  }

  getReports() {
    this.reports$ = this.admin.getAllReports(this.pageNumber, this.pageSize)
  }

  nextPage() {
    this.pageNumber++;
    this.getReports()
  }

  deleteReport(id: Guid) {
    this.admin.deleteReport(id).subscribe(result => {
      if (result.succeeded && result.status == 200) {
        this.getReports()
      }
    })
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getReports()
    }
  }


  setActive(id: Guid) {
    this.admin.setActiveReport(id).subscribe(result => {
      if(result.succeeded && result.status == 200) {
        this.getReports()
      }
    })
  }

  rejectReport(id: Guid) {
    this.admin.rejectReport(id).subscribe(result => {
      if(result.succeeded && result.status == 200) {
        this.getReports()
      }
    })
  }



  protected readonly ReportStatus = ReportStatus;
}
