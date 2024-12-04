import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  offerte: any[] = []; // Array per memorizzare le offerte
  limit: number = 10; // Limite di offerte da mostrare

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOfferte(); // Recupera le offerte quando il componente viene caricato
  }

  // Funzione per fare la richiesta GET all'API
  getOfferte(): void {
    const url = `http://localhost:3001/api/offerte?limit=${this.limit}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.offerte = data; // Memorizza le offerte ricevute
      },
      (error) => {
        console.error('Errore nel recupero delle offerte:', error);
      }
    );
  }

  // Funzione per eliminare un'offerta
  onDelete(offerId: string) {
    if (confirm('Sei sicuro di voler eliminare questa offerta?')) {
      this.http.delete(`http://localhost:3001/api/offerte/${offerId}`).subscribe(
        () => {
          alert('Offerta eliminata con successo!');
          // Rimuove l'offerta eliminata dalla lista
          this.offerte = this.offerte.filter(offerta => offerta._id !== offerId);
        },
        (error) => {
          console.error('Errore nell\'eliminazione dell\'offerta:', error);
          alert('Errore nell\'eliminazione dell\'offerta.');
        }
      );
    }
  }
}
