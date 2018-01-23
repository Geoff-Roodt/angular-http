import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { YouTubeSearchComponent } from './you-tube-search/you-tube-search.component';


@NgModule({
  declarations: [
    AppComponent,
    YouTubeSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
