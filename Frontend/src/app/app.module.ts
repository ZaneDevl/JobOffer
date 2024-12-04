import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { DeleteOfferComponent } from './delete-offer/delete-offer.component';
import { SearchOfferComponent } from './search-offer/search-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewOfferComponent,
    EditOfferComponent,
    DeleteOfferComponent,
    SearchOfferComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Importato per ngModel
    ReactiveFormsModule // Import necessario per i moduli reattivi
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
