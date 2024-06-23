import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AlertComponent } from './components/alert/alert.component';
import { CommandeComponent } from './components/commande/commande.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { ListCommandeComponent } from './components/list-commande/list-commande.component';
import { ListProduitsComponent } from './components/list-produits/list-produits.component';
import { LoginComponent } from './components/login/login.component';
import { OrdonnanceComponent } from './components/ordonnance/ordonnance.component';
import { PanierComponent } from './components/panier/panier.component';
import { PayementComponent } from './components/payement/payement.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistreComponent } from './components/registre/registre.component';
import { StockComponent } from './components/stock/stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClientFilterPipe } from './client-filter.pipe';

import { NgxPayPalModule } from 'ngx-paypal';
import { NgxStripeModule } from 'ngx-stripe';
@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    AlertComponent,
    CommandeComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    ListClientComponent,
    ListCommandeComponent,
    ListProduitsComponent,
    LoginComponent,
    OrdonnanceComponent,
    PanierComponent,
    PayementComponent,
    ProductsComponent,
    ProfileComponent,
    RegistreComponent,
    StockComponent,
    ClientFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51PPrIdBeNJuPh5fMzB36CdQs10WDcO1wKZpNxiic0kAG76Gpqrytpow9EboSC4GyfxLT70cFZdwgLSwWQq4fnVGT00Ds2DJzEs')

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
