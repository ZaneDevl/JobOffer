import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-offer',
  templateUrl: './search-offer.component.html',
  styleUrl: './search-offer.component.css'
})
export class SearchOfferComponent {
  searchForm: FormGroup;
  offerte: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      testo: [''],  // Campo per la parola chiave
      limit: [10]   // Default limit a 10 risultati
    });
  }

  // Funzione di ricerca
  onSearch() {
    const searchCriteria = this.searchForm.value;

    // Se non viene inserito un valore nella parola chiave, non eseguiamo la ricerca
    if (!searchCriteria.testo.trim()) {
      alert('Inserisci una parola chiave per la ricerca!');
      return;
    }

    this.loading = true;
    this.errorMessage = '';  // Reset messaggio di errore

    // Costruzione della query
    let query = `testo=${searchCriteria.testo}`;

    // Se limit è positivo, aggiungilo alla query
    if (searchCriteria.limit && searchCriteria.limit > 0) {
      query += `&limit=${searchCriteria.limit}`;
    }

    // Richiesta GET per cercare le offerte
    this.http.get(`http://localhost:3001/api/offerte/ricerca?${query}`).subscribe(
      (response: any) => {
        this.offerte = response;
        this.loading = false;
      },
      (error) => {
        console.error('Errore nella ricerca delle offerte:', error);
        this.loading = false;
        this.errorMessage = 'Errore nella ricerca delle offerte!';
      }
    );
}
}