import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { MoviesPage } from '../pages/movies/movies';
import { DetailsPage } from '../pages/details/details';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Importing the AF2 Module to use Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; 

export const firebaseConfig = {
    apiKey: "AIzaSyBoMfA5Ks4OZETQc8cHl_5B2PMuxwzGeEQ",
    authDomain: "bidview-project.firebaseapp.com",
    databaseURL: "https://bidview-project.firebaseio.com",
    projectId: "bidview-project",
    storageBucket: "bidview-project.appspot.com",
    messagingSenderId: "236492093261"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    MoviesPage,
    DetailsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SettingsPage,
    MoviesPage,
    DetailsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
