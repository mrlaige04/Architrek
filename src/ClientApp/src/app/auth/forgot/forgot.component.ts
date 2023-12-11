import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  digitValidator,
  emailValidator, lowercaseLetterValidator,
  requiredValidator,
  uppercaseLetterValidator
} from "../register/register.component";
import {AuthService} from "../auth.service";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  secondStep = false;

  resetForm: FormGroup;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.resetForm = fb.group({
      email: new FormControl('', [requiredValidator('Email is required'), emailValidator('Email is invalid')]),
      resetCode: new FormControl('', [requiredValidator('Code is required')]),
      newPassword: new FormControl('', [
        requiredValidator("Password is required"),
        uppercaseLetterValidator("Password must have at least 1 uppercase letter"),
        digitValidator("Password must have at least 1 digit"),
        lowercaseLetterValidator("Password must have at least 1 digit")])
    })
  }

  get email(): FormControl {
    return this.resetForm.get('email') as FormControl
  }

  submitFirstStep() {
    if (this.email.valid) {
      this.auth.forgotPassword({email: this.email.value}).subscribe(result => {
        if (result == null) {
          this.secondStep = true;
        }
      })
    } else {
      console.log('invalid')
    }
  }

  submitSecondStep() {
    if (this.resetForm.valid) {
      this.auth.resetPassword(this.resetForm.value).subscribe(async result => {
        console.log(result)
        if (result == null) {
          await this.router.navigate(['/'])
        } else {
          console.log(result)
        }
      })
    }
  }
}
