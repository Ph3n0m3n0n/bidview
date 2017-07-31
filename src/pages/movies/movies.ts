import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html'
})
export class MoviesPage {

  movies: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, aDB: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
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
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }


  itemTapped(event, movie) {
    this.navCtrl.push(DetailsPage, {
      item: movie
    });
  }


} // The End

