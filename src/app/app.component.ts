import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCCSuB1wsQhIv3hoQYCVJPBLCNu3idlEOU",
    authDomain: "ubhack-c10c4.firebaseapp.com",
    databaseURL: "https://ubhack-c10c4.firebaseio.com",
    projectId: "ubhack-c10c4",
    storageBucket: "ubhack-c10c4.appspot.com",
    messagingSenderId: "617081284342",
    appId: "1:617081284342:web:c1044e8dac46b76f8ceed7",
    measurementId: "G-FC2E5HLTQ4"
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
