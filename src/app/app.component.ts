import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
 
export class AppComponent {
  Menu:any[] = [
    {titulo : "Inicio", icon:'home', url:'/menup'},
    {titulo : "Sair", icon:'exit', url:'/home' },
  ]
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    var firebaseConfig = {
      apiKey: "AIzaSyD7c1wIR5nj8U1G2FGDWxaAHdI4woEkQ3c",
      authDomain: "eunemsei-52ab3.firebaseapp.com",
      databaseURL: "https://eunemsei-52ab3.firebaseio.com",
      projectId: "eunemsei-52ab3",
      storageBucket: "eunemsei-52ab3.appspot.com",
      messagingSenderId: "497296744049",
      appId: "1:497296744049:web:0b46ed5a5445567c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
