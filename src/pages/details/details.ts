import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { MoviesPage } from '../movies/movies';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  
  movies: FirebaseListObservable<any>; 
  movie = { movieId: '', title: '', year: '', length: '', genre: '', description: '', actor: '', poster: '', thumbnail: ''};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public aDB: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController) 
  {
    this.movies = aDB.list('/movies');
    this.movie.movieId = this.navParams.get('key');
    this.movie.title = this.navParams.get('title');
    this.movie.year = this.navParams.get('year');
    this.movie.length = this.navParams.get('length');
    this.movie.genre = this.navParams.get('genre');
    this.movie.description = this.navParams.get('description');
    this.movie.actor = this.navParams.get('actor');
    this.movie.poster = this.navParams.get('poster');
    this.movie.thumbnail = this.navParams.get('thumbnail');
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
            console.log('Cancel button clicked');
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

  showOptions(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.removeMovie(data);
          }
        }, {
          text: 'Edit',
          handler: () => {
            this.updateMovie(data);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
              console.log('Cancelled');
          }
        }
      ]

    });
    actionSheet.present();
  }

  removeMovie(data) {
    this.movies.remove(data);
  }


updateMovie(data) {
  let prompt = this.alertCtrl.create({
    title: 'Movie',
    message: 'You are now in Edit mode',
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
        placeholder: 'Actor',
      },
      {
        name: 'poster',
        placeholder: 'Image URL',
      },
      {
        name: 'thumbnail',
        placeholder: 'Thumbnail URL',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancelled editing the ' + data.title + ' movie.');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.movies.update(data, {
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


} // The End