import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminService} from "../../../admin.service";
import {Modal} from "flowbite";

@Component({
  selector: 'app-create-country-form',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-country-form.component.html',
  styleUrl: './create-country-form.component.scss'
})
export class CreateCountryFormComponent {
  createCountryForm: FormGroup;
  @Output() closeModalEvent = new EventEmitter<any>()
  closeModal() {
    this.closeModalEvent.emit()
  }

  constructor(fb: FormBuilder, private admin: AdminService) {
    this.createCountryForm = fb.group({
      name: new FormControl('', [Validators.required])
    })
  }

  createCountry() {
    if (this.createCountryForm.valid) {
      this.admin.createCountry(this.createCountryForm.value).subscribe(result => {
        console.log(result.succeeded)
      })
    }
  }
}
