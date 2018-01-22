import {Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {YouTubeSearchService} from './youtube-search.service';
import{SearchResult} from '../search-result/search-result.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

@Component({
  selector: 'search-box',
  template: `
  <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})

export class SearchBoxComponent implements OnInit{
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YouTubeSearchService, private el: ElementRef){ }

  ngOnInit(): void{
    Observable.fromEvent(this.el.nativeElement, 'keyup')
    .map((e:any) => e.target.value) // extract the value
    .filter((text: string) => text.length > 1)
    .debounceTime(250) // fires once every 250ms
    .do(() => this.loading.emit(true)) // enable the loading
    .map((query:string) => this.youtube.search(query))
    .switch() // discard if new search comes in
    .subscribe(
      (results: SearchResult[]) => { // success
        this.loading.emit(false);
        this.results.emit(results);
      },
      (err:any) => { // is an error
        console.log(err);
        this.loading.emit(false);
      },
      () => { // completion
        this.loading.emit(false);
      }
    );
  }
}
