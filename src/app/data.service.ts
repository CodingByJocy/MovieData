import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataService } from './environment';
import { Observable, map, of } from 'rxjs';

interface Movie {
  filter(arg0: (movie: any) => any): any;
  title: string,
  rank: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }


getMovies():Observable <Movie>{
  return this.httpClient.get<Movie>(`https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json`)
}

searchMovies(searchTerm: string):Observable<Movie[]> {
  if (!searchTerm) {
    return of([])
  }
  return this.getMovies().pipe(
    map(movies => movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())))
  )
}
  }
