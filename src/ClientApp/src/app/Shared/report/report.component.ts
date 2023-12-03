import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportService} from "./report.service";
import {Observable} from "rxjs";
import {ReportSubject} from "./models/ReportSubject";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {emailValidator, requiredValidator} from "../../auth/register/register.component";
import {ApiResult} from "../../core/Models/ApiResult";
ApiResult
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  reportSubjects$: Observable<any>
  reportForm: FormGroup;

  triedToSubmit = false;
  hasError = false;
  validationErrors: string[] = []

  constructor(private report: ReportService,
              fb: FormBuilder) {
    this.reportSubjects$ = report.getSubjects()

    this.reportForm = fb.group({
      email: new FormControl('', [
        requiredValidator('Email is required'),
        emailValidator('Email is not valid')
      ]),
      subject: new FormControl('', [
        requiredValidator('Subject is required')
      ]),
      message: new FormControl('', [
        requiredValidator('Message is required')
      ])
    })
  }

  clearForm() {
    this.reportForm.reset()
  }

  submit() {
    this.triedToSubmit = true;
    this.hasError = false;
    this.validationErrors = []
    if (this.reportForm.valid) {
      this.report.createReport(this.reportForm.value).subscribe(result => {
        if (result.succeeded && result.status == 200) {
          this.clearForm()
        }
      })
    } else {
      this.hasError = true;
      for (const controlName in this.reportForm.controls) {
        let control = this.reportForm.get(controlName)!
        for (const error in control.errors) {
          if (control.hasError(error)) {
            if (error == 'required') {
              this.validationErrors.push(`${controlName} is required`)
            }
            else {
              this.validationErrors.push(control.getError(error).message ?? control.getError(error))
            }
          }
        }
      }
    }
  }
}
