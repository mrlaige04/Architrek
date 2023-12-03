import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Guid} from "guid-typescript";
import {AdminService} from "../../../admin.service";

@Component({
  selector: 'app-answer-report-form',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './answer-report-form.component.html',
  styleUrl: './answer-report-form.component.scss'
})
export class AnswerReportFormComponent {
  @Output() closeModalEvent = new EventEmitter<any>()
  @Input({required: true}) id!: Guid
  closeModal() {
    this.closeModalEvent.emit()
  }

  message?: string;

  answerForm: FormGroup;

  constructor(fb: FormBuilder, private admin: AdminService) {
    this.answerForm = fb.group({
      message: new FormControl('')
    })
  }

  submit() {
    this.admin.answerReport(this.id, this.message!).subscribe(result => {
      if (result.succeeded && result.status == 200) {
        this.message = ""
        this.closeModal()
      }
    })
  }
}
