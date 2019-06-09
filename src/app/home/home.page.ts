import { Component, OnInit, ViewChild } from '@angular/core'
import { NavController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage { 
  @ViewChild(IonSlides) slides : IonSlides;
  
  public userLogin : User = {};
  public userRegister : User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    
  ) { }
msg:string;
segmentChanged(event : any){
  if(event.detail.value == "login"){
    this.slides.slidePrev();
  }
  else{
    this.slides.slideNext();
  }
}

async login() {
  await this.presentLoading();

  try {
    await this.authService.login(this.userLogin);
  } catch (error) {
    this.presentToast(error.message);
  } finally {
    this.loading.dismiss();
  }
}

async register() {
  await this.presentLoading();

  try {
    await this.authService.register(this.userRegister);
  } catch (error) {
    this.presentToast(error.message);
  } finally {
    this.loading.dismiss();
  }
}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
  return this.loading.present();
}

async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 2000 });
  toast.present();
 
}


}