import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class CoreModule { }
