import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {AuthService} from "../auth.service";
import {Guid} from "guid-typescript";
import {ConfirmEmail} from "../models/ConfirmEmail";
import {Router} from "@angular/router";

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
  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerGroup = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl(''),
      password: new FormControl('', [Validators.required, RxwebValidators.password({
        validation: {
          digit: true,
          lowerCase: true,
          specialCharacter: false,
          upperCase: true
        }
      })]),
      confirmPassword: new FormControl('', [RxwebValidators.compare({fieldName:'password'})])
    })
  }

  submit() { // TODO : validation
    if (true) {
      this.auth.register(this.registerGroup.value).subscribe(
        (data)=>{
          this.userId = data as Guid;
          this.step = 2;
        })
    } else console.log("not valid")
  }

  sendConfirmation() {
    let confirmModel = new ConfirmEmail(<Guid>this.userId, this.code.toString());
    console.log(JSON.stringify(confirmModel));
    this.auth.confirmEmail(confirmModel)
      .subscribe(data=>{
        if (!data) this.router.navigate(['/'])
      })
  }
}
