import { Component, OnInit } from '@angular/core';
import {SearchResult} from '../search-result/search-result.model';

@Component({
  selector: 'youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;

  constructor() { }

  updateResults(results: SearchResult[]): void{
    this.results = results;
  }

  ngOnInit() {
  }

}
