import {Component} from '@angular/core';
import {debounceTime} from 'rxjs';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ToastersService} from "../../services/ToastersService";
import {NgxSpinnerService} from "ngx-spinner";
import {ValidationProblem} from "../models/ValidationProblem";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  step: 1|2 = 1;
  registerGroup: FormGroup;
  triedToSubmit = false;
  hasValidationError = false;
  validationErrors: Array<string> = []

  constructor(fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              public spinner: NgxSpinnerService
              ) {

    this.registerGroup = fb.group({
      email: new FormControl('', [
        requiredValidator("Email is required"),
        emailValidator("Email is invalid")]),
      password: new FormControl('', [
        requiredValidator("Password is required"),
        uppercaseLetterValidator("Password must have at least 1 uppercase letter"),
        digitValidator("Password must have at least 1 digit"),
        lowercaseLetterValidator("Password must have at least 1 digit")]),
      confirmPassword: new FormControl('', [
        RxwebValidators.compare({fieldName:'password', message: 'Passwords do not match'})])
    })

    this.registerGroup.get('email')?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(()=>{
        if (this.registerGroup.get('email')!.valid) {
          const email = this.registerGroup.get('email')?.value;

          this.auth.checkEmailAvailability(email)
            .subscribe(
              (isAvailable: boolean) => {
                if (!isAvailable) this.registerGroup.get('email')?.setErrors({'notAvailable': "Email is not available"})
              }
            )
        }
      })
  }

  get emailErrors(): any {
    return this.registerGroup.get('email')?.errors;
  }

  async submit() {
    this.triedToSubmit = true;
    this.validationErrors = [];
    this.hasValidationError = false;
    if (this.registerGroup.valid) {
      await this.spinner.show();
      this.auth.register(this.registerGroup.value).subscribe(
        async (data)=>{
          await this.spinner.hide();
          if (data instanceof ValidationProblem) {
            console.log(data)
            this.hasValidationError = false;
            this.triedToSubmit = false;
          } else {
            this.step = 2;
          }
        },
        (error)=>{
          let errors = error.error.errors;
          for (const key in errors) {
            this.validationErrors.push(errors[key] ?? key)
          }
          this.hasValidationError = true;
        })
    } else {
      this.hasValidationError = true;
      for (const controlName in this.registerGroup.controls) {
        let control = this.registerGroup.get(controlName)!
        for (const error in control.errors) {
          if (control.hasError(error)) {
            if (error == 'required') {
              this.validationErrors.push(`${this.capitalizeFirstLetter(controlName)} is required`)
            }
            else {
              this.validationErrors.push(control.getError(error).message ?? control.getError(error))
            }
          }
        }
      }
    }
  }

  capitalizeFirstLetter(inputString: string): string {
    if (!inputString || inputString.length === 0) {
      return inputString;
    }

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }


  async getToMainPage() {
    await this.router.navigate(['/'])
  }

}


// Кастомний валідатор для перевірки наявності принаймні однієї букви в верхньому регістрі
export function uppercaseLetterValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!/[A-Z]/.test(value)) {
      return { uppercaseLetter: errorMessage };
    }

    return null;
  };
}

// Кастомний валідатор для перевірки наявності принаймні однієї букви в нижньому регістрі
export function lowercaseLetterValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!/[a-z]/.test(value)) {
      return { lowercaseLetter: errorMessage };
    }

    return null;
  };
}

// Кастомний валідатор для перевірки наявності принаймні однієї цифри
export function digitValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!/\d/.test(value)) {
      return { digit: errorMessage };
    }

    return null;
  };
}

// Кастомний валідатор для перевірки, чи поле є обов'язковим
export function requiredValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value ? null : { required: errorMessage };
  };
}

// Кастомний валідатор для перевірки правильності введеної електронної пошти
export function emailValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    // Регулярний вираз для перевірки формату електронної пошти
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(value)) {
      return { invalidEmail: errorMessage };
    }

    return null;
  };
}
