import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { DeleteOfferComponent } from './delete-offer/delete-offer.component';
import { SearchOfferComponent } from './search-offer/search-offer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-offer', component: NewOfferComponent },
  { path: 'edit-offer/:id', component: EditOfferComponent },
  { path: 'delete-offer/:id', component: DeleteOfferComponent },
  { path: 'search-offer', component: SearchOfferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
