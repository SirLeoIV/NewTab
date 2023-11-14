import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClockComponent} from './clock/clock.component';
import {GreetingComponent} from './greeting/greeting.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {WeatherComponent} from './weather/weather.component';
import {HttpClientModule} from "@angular/common/http";
import {BackgroundComponent} from './background/background.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {MatMenuModule} from "@angular/material/menu";
import {LinksComponent} from './links/links.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatChipsModule} from "@angular/material/chips";
import {SettingsComponent} from './settings/settings.component';
import {MatCardModule} from "@angular/material/card";
import {QuoteComponent} from './quote/quote.component';
import {SnakeComponent} from './games/snake/snake.component';
import {GamesComponent} from './games/games.component';
import {MatSliderModule} from "@angular/material/slider";
import {RunnerComponent} from './games/runner/runner.component';
import {GameOfLifeComponent} from './games/game-of-life/game-of-life.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    GreetingComponent,
    WeatherComponent,
    BackgroundComponent,
    SearchBarComponent,
    LinksComponent,
    SettingsComponent,
    QuoteComponent,
    SnakeComponent,
    GamesComponent,
    RunnerComponent,
    GameOfLifeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    NgOptimizedImage,
    MatMenuModule,
    MatExpansionModule,
    CdkDropList,
    NgFor,
    CdkDrag,
    MatTooltipModule,
    MatTabsModule,
    MatChipsModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [BackgroundComponent]
})
export class AppModule { }
