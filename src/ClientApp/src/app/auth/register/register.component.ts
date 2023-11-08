import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthService} from "../auth.service";
import {Guid} from "guid-typescript";
import {ConfirmEmail} from "../models/ConfirmEmail";
import {Router} from "@angular/router";
import {ToastersService} from "../../services/ToastersService";
import {ThemeService} from "../../Shared/theme.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  step: 1|2 = 1;
  registerGroup: FormGroup;

  userId: Guid|null = null;
  code: string = "";
  constructor(fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private toastr: ToastersService,
              public themeService: ThemeService
              ) {
    this.registerGroup = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl(''),
      password: new FormControl('', [Validators.required, RxwebValidators.password({
        validation: {
          digit: true,
          lowerCase: true,
          upperCase: true
        }
      })]),
      confirmPassword: new FormControl('', [RxwebValidators.compare({fieldName:'password'})])
    })
  }

  submit() { // TODO : validation
    alert('submit')
    if (this.registerGroup.valid) {
      this.auth.register(this.registerGroup.value).subscribe(
        (data)=>{

          this.userId = data as Guid;
          this.step = 2;
        })
    } else alert("not valid")
  }

   sendConfirmation() {
    let confirmModel = new ConfirmEmail(<Guid>this.userId, this.code.toString());
    this.auth.confirmEmail(confirmModel)
      .subscribe(async data=>{
        if (!data) {
          this.toastr.showSuccess("You have successfully registered")
          await this.router.navigate(['/'])
        }
      })
  }

  protected readonly alert = alert;
}
