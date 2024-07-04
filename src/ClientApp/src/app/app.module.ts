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
import {apiConfigProvider} from "./core/providers/apiConfig.provider";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


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
    ToastrModule.forRoot({
      maxOpened: 5,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true
    })
  ],
  providers: [
    provideClientHydration(),
    apiConfigProvider,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

