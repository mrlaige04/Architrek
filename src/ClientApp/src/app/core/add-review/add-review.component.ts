import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Guid} from "guid-typescript";
import {FormsModule} from "@angular/forms";
import {CoreService} from "../core.service";
import {ToastersService} from "../../services/ToastersService";



@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
})
export class AddReviewComponent {
  rating: number = 5;

  text?: string;
  photos?: FileList;
  @Input({required: true}) sightId!: Guid;

  constructor(private core: CoreService, private toastr: ToastersService) {
  }

  submit() {
    this.core.reviewSight({sightId: this.sightId, text: this.text, rating: this.rating}, Array.from(this.photos||[]))
      .subscribe(result => {
        if (result.succeeded) {
          this.rating = 5;
          this.text = undefined;
          this.photos = undefined;
          this.toastr.showSuccess('Successfully added review')
        } else {
          this.toastr.showError(result.errors.reduce((er1, er2)=>er1+"\n" + er2))
        }
      })
  }

  uploadFiles(event: Event) {
    const elem = event.currentTarget as HTMLInputElement;
    let files = elem.files;

    if (files) this.photos = files;
  }
}
