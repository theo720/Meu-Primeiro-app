import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Product } from '../interfaces/product';
import { Subscription } from 'rxjs';
import { ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-menup',
  templateUrl: './menup.page.html',
  styleUrls: ['./menup.page.scss'],
})
export class MenupPage implements OnInit {

  
    private loading: any;
    public products = new Array<Product>();
    private productsSubscription: Subscription;
  
    constructor(
      private authService: AuthService,
      private loadingCtrl: LoadingController,
      private productService: ProductserviceService,
      private toastCtrl: ToastController
    ) {
      this.productsSubscription = this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
    }
  
    ngOnInit() { }
  
    ngOnDestroy() {
      this.productsSubscription.unsubscribe();
    }
  
    async logout() {
      await this.presentLoading();
  
      try {
        await this.authService.logout();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading.dismiss();
      }
    }
  
    async presentLoading() {
      this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
      return this.loading.present();
    }
  
    async deleteProduct(id: string) {
      try {
        await this.productService.deleteProduct(id);
      } catch (error) {
        this.presentToast('Erro ao tentar deletar');
      }
    }
  
    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({ message, duration: 2000 });
      toast.present();
    }
  }

