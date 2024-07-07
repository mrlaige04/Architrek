import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {DynamicLogoComponent} from "../dynamic-logo/dynamic-logo.component";
import {NavbarMenuComponent} from "./navbar-menu/navbar-menu.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    MatToolbar,
    DynamicLogoComponent,
    NavbarMenuComponent
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
}
