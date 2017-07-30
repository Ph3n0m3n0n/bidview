import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  movies: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, aDB: AngularFireDatabase) {
    this.movies = aDB.list('/movies');
  }

}
