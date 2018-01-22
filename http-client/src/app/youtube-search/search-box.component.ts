import {Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {YouTubeSearchService} from './youtube-search.service';
import{SearchResult} from '../search-result/search-result.model';

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

  
}
