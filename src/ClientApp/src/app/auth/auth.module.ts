import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
