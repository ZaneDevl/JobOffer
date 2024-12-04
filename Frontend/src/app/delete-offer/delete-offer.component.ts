import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-offer',
  templateUrl: './delete-offer.component.html',
  styleUrl: './delete-offer.component.css'
})
export class DeleteOfferComponent {
  offerId: string = ''; // ID dell'offerta da eliminare
  successMessage: string = ''; // Messaggio di successo
  errorMessage: string = ''; // Messaggio di errore

  constructor(private http: HttpClient) {}

  // Funzione per eliminare un'offerta
  onDelete() {
    if (!this.offerId.trim()) {
      this.errorMessage = 'Inserisci un ID valido!';
      return;
    }

    this.errorMessage = '';  // Reset messaggio di errore
    this.successMessage = '';  // Reset messaggio di successo

    // Effettua la richiesta DELETE all'API per eliminare l'offerta
    this.http.delete(`http://localhost:3001/api/offerte/${this.offerId}`).subscribe(
      () => {
        this.successMessage = 'Offerta eliminata con successo!';
        this.offerId = '';  // Reset dell'ID
      },
      (error) => {
        console.error('Errore nell\'eliminazione dell\'offerta:', error);
        this.errorMessage = 'Errore nell\'eliminazione dell\'offerta!';
      }
    );
  }
}
