import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';
import {SearchResultComponent} from './you-tube-search/search-result.component';
import {SearchBoxComponent} from './you-tube-search/search-box.component';
import {YouTubeSearchInjectables} from './you-tube-search/you-tube-search.injectables';

@NgModule({
  declarations: [
    AppComponent,
    YouTubeSearchComponent,
    SearchResultComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [YouTubeSearchInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
