import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../../../auth/auth.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { PasswordValidators, requiredValidator } from "../../../../auth/register/register.component";
import { ValidationProblem } from "../../../../auth/models/ValidationProblem";
import { catchError, throwError } from "rxjs";
import { ToastersService } from "../../../../services/ToastersService";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  form: FormGroup;

  constructor(private auth: AuthService, fb: FormBuilder, private toastr: ToastersService) {
    this.form = fb.group({
      oldPassword: new FormControl('', requiredValidator('Old password is required')),
      newPassword: new FormControl('', PasswordValidators)
    });
    this.handleValidationProblem = this.handleValidationProblem.bind(this);
  }

  private get oldPassword() {
    return this.form.get('oldPassword') as FormControl
  }

  private get newPassword() {
    return this.form.get('newPassword') as FormControl
  }

  submit() {
    if (this.form.valid) {
      this.auth.changePassword(this.form.value)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(() => <ValidationProblem>err.error);
          })
        )
        .subscribe({
          next: result => {
            if (result instanceof ValidationProblem) {
              this.handleValidationProblem(result);
            } else {
              this.form.reset();
              this.toastr.showSuccess('Password changed successfully', 'Ok');
            }
          },
          error: this.handleValidationProblem
        });
    } else {
      let oldPassword = this.oldPassword;
      let newPassword = this.newPassword;

      for (let errorsKey in oldPassword.errors) {
        this.toastr.showError(oldPassword.errors[errorsKey])
      }

      for (let errorsKey in newPassword.errors) {
        this.toastr.showError(newPassword.errors[errorsKey])
      }
    }
  }

  handleValidationProblem(error: ValidationProblem) {
    for (const errorsKey in error.errors) {
      this.toastr.showError((<any>error.errors)[errorsKey][0], errorsKey);
    }
  }
}
