import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';

// These constants are required to give us access to the YouTube API for searching
export const YOUTUBE_API_KEY = 'AIzaSyAaXpmZz7L541X2AYTP6jK24h5EcsH-nfk';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Marked as Injectable for dependency injection
// We inject our constants as set parameters for our service's constructor
@Injectable()
export class YouTubeSearchService {
  constructor( private http: HttpClient, @Inject(YOUTUBE_API_KEY) private apiKey: string, @Inject(YOUTUBE_API_URL) private apiUrl: string ) {}

  // The search query is assembled to be handed off to YouTube's API as a web request
  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    // A standard HTTP GET request is fired and we subscribe, map and cast the result into a Search Result object to hand back to the component for display on the page
    return this.http.get(queryUrl).map(response => {
      return <any>response['items'].map(item => {
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    });
  }

}
