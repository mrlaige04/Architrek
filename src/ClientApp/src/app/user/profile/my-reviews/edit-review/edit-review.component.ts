import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Guid} from "guid-typescript";
import {SightReview} from "../../../../core/Models/SightReview";
import {UserService} from "../../../user.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SightReviewPhoto} from "../../../../core/Models/SightReviewPhoto";
import {SynchronousPromise} from "synchronous-promise";
import {ApiResult} from "../../../../core/Models/ApiResult";
import {forkJoin, switchMap} from "rxjs";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-edit-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.scss'
})
export class EditReviewComponent {
  _review!: SightReview;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  photos: {add: Array<File>, remove: Array<Guid>} = {
    add: [],
    remove: []
  }

  @Input({required: true})
  set review(value: SightReview) {
    this._review = value;
    if (this._review) {
      this.editReview = this.fb.group({
        text: new FormControl(this._review.reviewText),
        rating: new FormControl(this._review.rating, RxwebValidators.range({
          minimumNumber: 1,
          maximumNumber: 5,
          message: 'Rating must be in range 1-5'
        }))
      })
    }
  }

  editReview!: FormGroup;

  constructor(private user: UserService, private fb: FormBuilder) {

  }

  save() {
    if (!this.editReview.valid) {
      console.log("invalid")
    } else {
      console.log('valid')
      this.user.editReview(this._review.id, this.editReview.value, this.photos)
        .subscribe({
          next: result => {
            if (result.succeeded) {
              this.closeModalEvent.emit(true)
              this.editReview.reset()
            }
          },
          error: err => {
            this.closeModalEvent.emit(false)
            this.editReview.reset()
          }
        })
    }
  }

  uploadFiles(event: Event) {
    const elem = event.currentTarget as HTMLInputElement;
    let photos = elem.files;
    if (photos) {
      let photoList = Array.from(photos||[])
      photoList.forEach(p => this.photos.add.push(p))
    }
  }

  removePhoto(photo: SightReviewPhoto) {
    let index = this._review.photos?.indexOf(photo)
    if (index != undefined && index !== -1) {
      this._review.photos?.splice(index, 1)
      this.photos.remove.push(photo.id)
    }
  }



  closeModal() {
    this.closeModalEvent.emit(false);
  }

  private fileToBase64(file: File) {
    return new SynchronousPromise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(<string>reader.result);
      reader.onerror = reject;
    });
  }
}

export type EditReview = {
  text: string;
  rating: number;
}
