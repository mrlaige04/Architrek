import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import { HideMenuDirective } from './hide-menu.directive';
import {RouterLink} from "@angular/router";
import {DynamicLogoComponent} from "./dynamic-logo/dynamic-logo.component";
import {NavbarMenuComponent} from "./navbar/navbar-menu/navbar-menu.component";



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
    RouterLink,
    DynamicLogoComponent,
    NavbarMenuComponent
  ]
})
export class SharedModule { }
