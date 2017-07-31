import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

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

  showOptions(movieId, movieTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Movie',
          role: 'destructive',
          handler: () => {
            this.removeMovie(movieId);
          }
        }, {
          text: 'Update title',
          handler: () => {
            this.updateMovie(movieId, movieTitle);
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

  removeMovie(movieId) {
    this.movies.remove(movieId);
  }


updateMovie(movieId, movieTitle) {
  let prompt = this.alertCtrl.create({
    title: 'Movie Title',
    message: 'Update Movie Title',
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: movieTitle
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancelled');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.movies.update(movieId, {
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
}


} // The End

