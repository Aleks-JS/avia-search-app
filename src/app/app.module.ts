import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadioItemComponent } from './radio-item/radio-item.component';
import { CheckboxItemComponent } from './checkbox-item/checkbox-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RadioItemComponent,
    CheckboxItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
