import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Movie } from '../movie/movie';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  movies: FirebaseListObservable<any[]>;   
  movie: FirebaseListObservable<any>;     

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public aDB: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController) 
  {
    this.movies = aDB.list('/movies');
  }

addMovie(){
    let prompt = this.alertCtrl.create({
      title: 'Movie Title',
      message: 'Enter a movie title',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
        },
                {
          name: 'year',
          placeholder: 'Year',
        },
                {
          name: 'length',
          placeholder: 'Length',
        },
                {
          name: 'genre',
          placeholder: 'Genre',
        },
                {
          name: 'description',
          placeholder: 'Description',
        },
                {
          name: 'actor',
          placeholder: 'Enter an actor name',
        },
                {
          name: 'poster',
          placeholder: 'Image URL',
        },
                {
          name: 'thumbnail',
          placeholder: 'Image Thumbnail URL',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel button clicked on item ' + data.$key);
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.movies.push({
              title: data.title,
              year: data.year,
              length: data.length,
              genre: data.genre,
              description: data.description,
              actor: data.actor,
              poster: data.poster,
              thumbnail: data.thumbnail,
            });
          }
        }
      ]
    });
    prompt.present();
  }


  openmovieDetail(data){ 
      this.navCtrl.push(DetailsPage, data)
          console.log("I am passing the " + data.$key + " movie from movie.ts to details.ts.");
  }

} // The End