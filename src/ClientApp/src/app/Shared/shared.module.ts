import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import { HideMenuDirective } from './hide-menu.directive';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HideMenuDirective
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HideMenuDirective
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule { }
