import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DynamicLogoComponent } from '../Shared/dynamic-logo/dynamic-logo.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {PassTokenInterceptor} from "./pass-token.interceptor";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        ForgotComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        DynamicLogoComponent,
        NgxSpinnerModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PassTokenInterceptor,
            multi: true
        }
    ]
})
export class AuthModule { }
