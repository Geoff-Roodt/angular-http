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

@Component({
  selector: 'search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService, private el: ElementRef) { }

  ngOnInit(): void {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // get the value
      .filter((text: string) => text.length > 1)
      .debounceTime(250)                         // fires only every 250ms
      .do(() => this.loading.emit(true))         // enable loading gif
      .map((query: string) => this.youtube.search(query)) // discard if a new term comes in
      .switch()
      .subscribe(
        (results: SearchResult[]) => { // success
          this.loading.emit(false);
          this.results.emit(results);
        },
        (err: any) => { // well, an error
          console.log(err);
          this.loading.emit(false);
        },
        () => { // completed
          this.loading.emit(false);
        }
      );
  }
}
