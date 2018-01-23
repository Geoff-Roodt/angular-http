import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { SearchResultComponent } from './youtube-search/search-result.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import {SearchBoxComponent} from './youtube-search/search-box.component';
import {YouTubeSearchInjectables} from './youtube-search/youtube-search.injectables';


@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    SearchResultComponent,
    YoutubeSearchComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    YouTubeSearchInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
