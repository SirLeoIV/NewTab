import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClockComponent } from './clock/clock.component';
import { GreetingComponent } from './greeting/greeting.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { WeatherComponent } from './weather/weather.component';
import {HttpClientModule} from "@angular/common/http";
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    GreetingComponent,
    WeatherComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, NgIf,
    MatButtonModule,
    MatIconModule,
    HttpClientModule, NgOptimizedImage
  ],
  providers: [],
  bootstrap: [BackgroundComponent]
})
export class AppModule { }
