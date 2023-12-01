import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

import {CoreService} from "../../../../core/core.service";
import {Observable} from "rxjs";
import {PaginatedList} from "../../../../core/Models/PaginatedList";
import {Category} from "../../../../core/Models/category";
import {AdminService} from "../../../admin.service";
import {Country} from "../../../../core/Models/Country";
import {ToastersService} from "../../../../services/ToastersService";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-create-sight-form',
  standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-sight-form.component.html',
  styleUrl: './create-sight-form.component.scss'
})
export class CreateSightFormComponent {
  categories$: Observable<PaginatedList<Category>>
  countries$: Observable<PaginatedList<Country>>;
  form: FormGroup;
  photos?: File[];

  triedToSubmit = false;
  hasValidationError = false;
  validationErrors: Array<string> = []
  constructor(private core: CoreService,
              private fb: FormBuilder,
              private toastr: ToastersService,
              private admin: AdminService) {
    this.categories$ = core.getAllCategories()
    this.countries$ = admin.getAllCountries(-1)

    this.form = fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      infoBlocks: fb.array([]),
      categoryId: new FormControl('', [Validators.required]),
      tags: fb.array([]),
      location: fb.group({
        countryId: new FormControl('', [Validators.required]),
        latitude: new FormControl('', [Validators.required]),
        longitude: new FormControl('', [Validators.required])
      })
    })
  }

  get location(): FormGroup {
    return this.form.get('location') as FormGroup
  }

  get tags(): FormArray {
    return this.form.get('tags') as FormArray
  }

  get infoBlocks(): FormArray {
    return this.form.get('infoBlocks') as FormArray;
  }

  toFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  appendTagInfo() {
    const newTag = this.fb.group({
      name: ['', Validators.required]
    })

    this.tags.push(newTag)
  }

  appendInfoBlock() {
    const newBlock = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });

    this.infoBlocks.push(newBlock);
  }

  onPhotoInputChange(event: Event) {
    let input = event.target as HTMLInputElement;
    let fileList: FileList | null = input.files;
    if (fileList) {
      this.photos = Array.from(fileList);
    }

    input.files = null;
  }

  removeInfoBlock(index: number) {
    this.infoBlocks.removeAt(index);
  }

  removeTag(index: number) {
    this.tags.removeAt(index)
  }

  createSight() {
    this.triedToSubmit = true;
    this.validationErrors = [];
    this.hasValidationError = false;
    if (this.form.valid) {
      this.admin.createSight(this.form.value, this.photos)
        .subscribe( data => {
          if (data.succeeded) {
            this.clearForm()
            this.toastr.showSuccess('Success')
          }
        })
    }
  }

  clearForm() {
    this.form.reset()
    this.photos = undefined;
  }
}
