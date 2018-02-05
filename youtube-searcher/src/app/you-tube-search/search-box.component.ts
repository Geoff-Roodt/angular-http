import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';
import { YouTubeSearchService } from './you-tube-search.service';
import { SearchResult } from './search-result.model';

// The template property makes use of the inline template styling, rather than linking to an HTML file
@Component({
  selector: 'search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})

export class SearchBoxComponent implements OnInit {
  // The @Output attribute tells the component to broadcast an object to the "outside" world, from the component's view
  // EventEmitters allow us to implement the observable pattern by attaching a subscription to an object and publish events to them.
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService, private el: ElementRef) { }

  ngOnInit(): void {
    Observable.fromEvent(this.el.nativeElement, 'keyup')    // Our observable listens to the keyup event for our HTML element...
      .map((e: any) => e.target.value)                      // We get the key value
      .filter((text: string) => text.length > 1)            // Filter the element input for those that are more than 1 character long
      .debounceTime(250)                                    // fires the next part only every 250ms
      .do(() => this.loading.emit(true))                    // enable the loading gif to tell user the search is happening
      .map((query: string) => this.youtube.search(query))   // discard our search if a new term comes in
      .switch()                                             // ignore all searches except the most recent
      .subscribe(                                           // subscribe to our search query from YouTube
        (results: SearchResult[]) => {                      // success
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => {                                     // an error has happened
          console.log(err);
          this.loading.emit(false);
        },
        () => {                                             // the search has completed
          this.loading.emit(false);
        }
      );
  }
}
