import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Movie {
  title: string;
  rank: string;
  id: string;
}

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})

export class MyTableComponent implements OnInit {
  movies: Movie[] = [];
searchQuery: any;
rankMessage: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<Movie[]>('https://raw.githubusercontent.com/hjorturlarsen/IMDB-top-100/master/data/movies.json').subscribe(
      (response) => {
        this.movies = response;
      },
      (error) => {
        console.error('Unable to fetch movies', error);
      }
    );
  }

searchMovies(){
  const searchTitle = this.searchQuery.toLowerCase();
  const foundMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(searchTitle));

if (foundMovies.length > 0) {
  const ranks = foundMovies.map(movie => movie.rank);
  this.rankMessage = `The movie "${this.searchQuery}" is ranked at: ${ranks.join(', ')}`;
  console.log(this.rankMessage);
} else {
  this.rankMessage = `The movie "${this.searchQuery}" was not found.`;
      console.log(this.rankMessage);
}

}}
