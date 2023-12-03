import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./Shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import { HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({type:'ball-scale-multiple'}),
    ToastrModule.forRoot({
      maxOpened: 3,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

